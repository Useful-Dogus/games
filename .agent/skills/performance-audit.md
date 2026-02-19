# Skill: Performance Audit (React / Web)

Purpose:
- Audit React and web performance bottlenecks by priority and propose improvements.

Trigger:

- Performance issue reported
- Optimization of a key screen or flow
- Pre-release performance check

Priority:

1. Waterfall elimination (CRITICAL)
2. Bundle size check (CRITICAL)
3. Re-render optimization (MEDIUM)
4. Rendering cost optimization (MEDIUM)
5. JS micro-optimization (LOW)

Report Format:

- Issue: `BLOCK / WARN / NOTE`
- Evidence: reproduction path + code location
- Improvement: at least one proposal (Before/After when needed)
- Expected effect: perceived user impact or measurable metric

Operating Principles:

- Do not guess-optimize without measurement.
- For optimizations requiring >2 hours of work or adding an abstraction layer, evaluate effect vs added complexity before proceeding.

## Game-Specific Notes (Future)

When game engine code (canvas, WebGL, Phaser, Pixi.js, etc.) is introduced, add the following priorities:

- Frame rate stability (target 60 fps)
- Asset loading waterfall (sprite sheets, audio)
- Game loop efficiency (avoid per-frame allocations)

Until game engine code is present, standard React / Next.js criteria apply.
