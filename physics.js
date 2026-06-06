// physics.js — 発見されている物理方程式の集成（代表的な基本法則）と、
// そこから「動き」と「光」を構成するための実装。pi.js と同じく外部依存ゼロ。
// window.PHYSICS.laws … 参照用の方程式リスト
// window.PHYSICS.<fn> … 上の法則を実際の運動・光に使う関数（m=1, dt=1 frame で正規化）
(function () {
  var LAWS = [
    // --- 力学 / mechanics ---
    { n: "Newton — second law",        e: "F = m·a",                          f: "mechanics" },
    { n: "Momentum",                   e: "p = m·v",                          f: "mechanics" },
    { n: "Hooke's law",                e: "F = −k·x",                         f: "elasticity" },
    { n: "Damped harmonic oscillator", e: "m·ẍ + c·ẋ + k·x = 0",              f: "oscillation" },
    { n: "Simple harmonic motion",     e: "x(t) = A·cos(ωt + φ)",             f: "oscillation" },
    { n: "Viscous drag",               e: "F = −c·v",                         f: "dissipation" },
    { n: "Kinetic energy",             e: "E = ½·m·v²",                       f: "energy" },
    { n: "Work–energy theorem",        e: "W = ∫ F·dx = ΔE",                  f: "energy" },
    { n: "Universal gravitation",      e: "F = G·m₁m₂ / r²",                  f: "gravity" },
    { n: "Pendulum period",            e: "T = 2π·√(L/g)",                    f: "oscillation" },
    // --- 電磁気 / electromagnetism ---
    { n: "Coulomb's law",              e: "F = k·q₁q₂ / r²",                  f: "electrostatics" },
    { n: "Gauss's law (E)",            e: "∇·E = ρ/ε₀",                       f: "electromagnetism" },
    { n: "Gauss's law (B)",            e: "∇·B = 0",                          f: "electromagnetism" },
    { n: "Faraday's law",              e: "∇×E = −∂B/∂t",                     f: "electromagnetism" },
    { n: "Ampère–Maxwell law",         e: "∇×B = μ₀J + μ₀ε₀·∂E/∂t",           f: "electromagnetism" },
    { n: "Lorentz force",              e: "F = q(E + v×B)",                   f: "electromagnetism" },
    { n: "Ohm's law",                  e: "V = I·R",                          f: "electromagnetism" },
    // --- 波動 / waves ---
    { n: "Wave equation",              e: "∂²u/∂t² = c²·∇²u",                 f: "waves" },
    { n: "Doppler effect",             e: "f' = f·(c ± v_o)/(c ∓ v_s)",       f: "waves" },
    { n: "Wave relation",              e: "c = λ·f",                          f: "waves" },
    // --- 量子 / quantum ---
    { n: "Schrödinger equation",       e: "iℏ·∂ψ/∂t = Ĥψ",                    f: "quantum" },
    { n: "Heisenberg uncertainty",     e: "Δx·Δp ≥ ℏ/2",                      f: "quantum" },
    { n: "Planck relation",            e: "E = h·f",                          f: "quantum" },
    { n: "de Broglie wavelength",      e: "λ = h/p",                          f: "quantum" },
    // --- 相対論 / relativity ---
    { n: "Mass–energy equivalence",    e: "E = m·c²",                         f: "relativity" },
    { n: "Lorentz factor",             e: "γ = 1/√(1 − v²/c²)",               f: "relativity" },
    { n: "Einstein field equations",   e: "Gμν + Λ·gμν = (8πG/c⁴)·Tμν",       f: "relativity" },
    { n: "Time dilation",              e: "Δt' = γ·Δt",                       f: "relativity" },
    // --- 熱 / thermodynamics ---
    { n: "Heat (diffusion) equation",  e: "∂u/∂t = α·∇²u",                    f: "thermal" },
    { n: "First law",                  e: "dU = δQ − δW",                     f: "thermodynamics" },
    { n: "Second law (entropy)",       e: "dS ≥ 0",                           f: "thermodynamics" },
    { n: "Ideal gas law",              e: "P·V = n·R·T",                      f: "thermodynamics" },
    { n: "Boltzmann entropy",          e: "S = k_B·ln Ω",                     f: "thermodynamics" },
    // --- 流体 / fluids ---
    { n: "Navier–Stokes",              e: "ρ(∂v/∂t + v·∇v) = −∇p + μ∇²v + f",  f: "fluids" },
    { n: "Continuity",                 e: "∂ρ/∂t + ∇·(ρv) = 0",               f: "fluids" },
    { n: "Bernoulli",                  e: "p + ½ρv² + ρgh = const",           f: "fluids" },
    // --- 光 / light ---
    { n: "Snell's law",                e: "n₁·sinθ₁ = n₂·sinθ₂",              f: "light" },
    { n: "Inverse-square law",         e: "I = I₀ / r²",                      f: "light" },
    { n: "Lambert's cosine law",       e: "I = I₀·cosθ",                      f: "light" },
    { n: "Beer–Lambert law",           e: "I = I₀·e^(−α·d)",                  f: "light" },
    { n: "Fresnel reflectance",        e: "R = ½(R_s + R_p)",                 f: "light" },
    { n: "Planck's law",               e: "B(λ,T) = (2hc²/λ⁵)/(e^(hc/λk_BT)−1)", f: "light" },
    { n: "Stefan–Boltzmann law",       e: "j = σ·T⁴",                         f: "light" },
    { n: "Wien's displacement law",    e: "λ_max = b/T",                      f: "light" }
  ];

  // ---- 上の法則を、画面の動き・光に使う実装（m = 1, dt = 1 frame）----
  var PHYSICS = {
    laws: LAWS,

    // 粘性摩擦  F = −c·v  →  v ← v·(1 − c)   （フリック後の滑走）
    damp: function (v, c) { return v * (1 - c); },

    // 減衰調和振動  ẍ = −k(x − x₀) − c·ẋ   （クリック時の収束）
    springAccel: function (x, x0, v, k, c) { return -k * (x - x0) - c * v; },

    // 逆二乗則（やわらかく）  I = I₀ / (1 + r²)   （光の減衰）
    attenuate: function (I0, r) { return I0 / (1 + r * r); },

    // ランベルト余弦則  I = I₀·max(0, cosθ)
    lambert: function (cos) { return cos > 0 ? cos : 0; },

    // 運動エネルギー  E = ½·m·v²   （光の強さの源）
    kinetic: function (v, m) { return 0.5 * (m || 1) * v * v; }
  };

  window.PHYSICS = PHYSICS;
})();
