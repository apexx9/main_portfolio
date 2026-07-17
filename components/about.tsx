export default function About() {
  return (
    <section id="about" className="py-20 md:py-40 relative border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-xs font-medium tracking-[0.1em] text-white/50 uppercase mb-8 font-dm">About</p>
              <h2 className="font-syne text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>
                Design is<br />how it works,
                <span className="text-white/50"> not just how it looks.</span>
              </h2>
            </div>

            <div className="space-y-8 font-dm">
              <div className="space-y-6 text-white/70 font-light leading-relaxed text-base">
                <p>
                  With over a decade of experience crafting digital products, 
                  I focus on creating experiences that feel intuitive and effortless. 
                  Every pixel and interaction is intentional.
                </p>
                <p>
                  Currently working with forward-thinking brands and startups 
                  to bring their visions to life through thoughtful design 
                  and clean development.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div>
                  <p className="font-syne text-4xl font-bold mb-1 text-white" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>50+</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Projects</p>
                </div>
                <div>
                  <p className="font-syne text-4xl font-bold mb-1 text-white" style={{ fontFamily: "'Syne', var(--font-inter), sans-serif" }}>12</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Years Exp.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
