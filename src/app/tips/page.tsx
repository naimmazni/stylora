import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.scss';

export default function TipsPage() {
  return (
    <div className={styles.tipsPage}>
      <Navbar />
      <div className={styles.pageContainer}>
        <div className={styles.mainWrapper}>
          <aside className={styles.sidebar}>
            <header className={styles.sidebarHeader}>
              <h1>Mastering Your Personal Color Harmony</h1>
            </header>
            <nav className={styles.sidebarNav}>
              <ul>
                <li>
                  <a className={styles.navItem} href="#warm-tone-analysis">Warm Tones</a>
                </li>
                <li>
                  <a className={styles.navItem} href="#cool-tone-analysis">Cool Tones</a>
                </li>
                <li>
                  <a className={styles.navItem} href="#neutral-tone-analysis">Neutral Tones</a>
                </li>
              </ul>
            </nav>
          </aside>
          <main className={styles.mainContent}>
            <section className={styles.section} id="warm-tone-analysis">
              <h2>Warm Tone Analysis: Understanding Your Undertones</h2>
              <div className={styles.flexRow}>
                <div className={styles.flexCol}>
                  <div className={styles.expandedBasis}>
                    <h3 className={styles.expandedBasisTitle}>
                      <span className={styles.icon}>
                        {/* SVG icon */}
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height={20} width={20}>
                          <path clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fillRule="evenodd" />
                        </svg>
                      </span>
                      Expanded Basis
                    </h3>
                    <p>
                      Warm undertones have golden or peachy hints beneath the skin's surface, influenced by carotene and melanin. They are characterized by veins that appear greenish and a natural radiance when wearing gold jewelry. These tones often have a sun-kissed quality, regardless of how light or deep the overall complexion is.
                    </p>
                  </div>
                  <figure className={styles.portraitImageContainer}>
                    <img
                      alt="Person with warm undertones wearing warm colors"
                      className={styles.portraitImage}
                      src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&q=80"
                    />
                    <figcaption>Figure 1: Warm Undertone Manifestation with Gold & Earth Tones</figcaption>
                  </figure>
                </div>
                <div className={styles.flexCol}>
                  <div className={styles.swatchGridContainer}>
                    <div className={styles.swatchGrid}>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#DAA520' }} />
                        <figcaption>Golden Hour</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#B7410E' }} />
                        <figcaption>Rust</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#6B8E23' }} />
                        <figcaption>Olive</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#FFFDD0' }} />
                        <figcaption>Cream</figcaption>
                      </figure>
                    </div>
                    <p className={styles.swatchGridCaption}>Key Warm Palette Swatches</p>
                  </div>
                </div>
              </div>
            </section>
            <section className={styles.section} id="color-theory-application">
              <h2>Color Theory Application & Nuances</h2>
              <div className={styles.colorTheoryContent}>
                <h3>Applying Warm Tones: Enhancing Your Harmony</h3>
                <p>
                  Warm colors complement your skin's natural warmth, creating a harmonious glow. Focus on rich, earthy hues like deep oranges, mustards, olive greens, and cream. Avoid icy cool colors or stark whites, as they can make warm skin look dull. Embrace gold and brass accessories to enhance your natural beauty.
                </p>
              </div>
            </section>

            {/* Cool Tones Section */}
            <section className={styles.section} id="cool-tone-analysis">
              <h2>Cool Tone Analysis: Understanding Your Undertones</h2>
              <div className={styles.flexRow}>
                <div className={styles.flexCol}>
                  <div className={styles.expandedBasis}>
                    <h3 className={styles.expandedBasisTitle}>
                      <span className={styles.icon}>
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height={20} width={20}>
                          <path clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fillRule="evenodd" />
                        </svg>
                      </span>
                      Understanding Cool Undertones
                    </h3>
                    <p>
                      Cool undertones have pink, red, or blue hints beneath the skin's surface. They are characterized by veins that appear blue or purple and a natural radiance when wearing silver jewelry. These tones often have a rosy quality and look best in jewel tones and cool colors.
                    </p>
                  </div>
                  <figure className={styles.portraitImageContainer}>
                    <img
                      alt="Person with cool undertones wearing cool colors"
                      className={styles.portraitImage}
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80"
                    />
                    <figcaption>Figure 2: Cool Undertone Manifestation with Silver & Jewel Tones</figcaption>
                  </figure>
                </div>
                <div className={styles.flexCol}>
                  <div className={styles.swatchGridContainer}>
                    <div className={styles.swatchGrid}>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#1B3A6B' }} />
                        <figcaption>Navy Blue</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#50C878' }} />
                        <figcaption>Emerald</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#8B3A62' }} />
                        <figcaption>Berry</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#B8C5D6' }} />
                        <figcaption>Icy Gray</figcaption>
                      </figure>
                    </div>
                    <p className={styles.swatchGridCaption}>Key Cool Palette Swatches</p>
                  </div>
                </div>
              </div>
              <div className={styles.colorTheoryContent}>
                <h3>Applying Cool Tones: Enhancing Your Harmony</h3>
                <p>
                  Cool colors complement your skin's natural coolness, creating a sophisticated glow. Focus on jewel tones like sapphire, emerald, amethyst, and ruby. Navy, burgundy, and cool grays also work beautifully. Avoid warm oranges, yellows, and browns that can make cool skin look washed out. Embrace silver and platinum accessories to enhance your natural beauty.
                </p>
              </div>
            </section>

            {/* Neutral Tones Section */}
            <section className={styles.section} id="neutral-tone-analysis">
              <h2>Neutral Tone Analysis: Understanding Your Undertones</h2>
              <div className={styles.flexRow}>
                <div className={styles.flexCol}>
                  <div className={styles.expandedBasis}>
                    <h3 className={styles.expandedBasisTitle}>
                      <span className={styles.icon}>
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height={20} width={20}>
                          <path clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fillRule="evenodd" />
                        </svg>
                      </span>
                      Understanding Neutral Undertones
                    </h3>
                    <p>
                      Neutral undertones have a balanced mix of warm and cool tones beneath the skin's surface. They are characterized by veins that appear both blue and green, and they look good in both gold and silver jewelry. These versatile tones can wear a wide range of colors beautifully.
                    </p>
                  </div>
                  <figure className={styles.portraitImageContainer}>
                    <img
                      alt="Person with neutral undertones wearing neutral colors"
                      className={styles.portraitImage}
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80"
                    />
                    <figcaption>Figure 3: Neutral Undertone Versatility</figcaption>
                  </figure>
                </div>
                <div className={styles.flexCol}>
                  <div className={styles.swatchGridContainer}>
                    <div className={styles.swatchGrid}>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#9CAF88' }} />
                        <figcaption>Sage Green</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#C8A5A5' }} />
                        <figcaption>Dusty Rose</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#9B8B7E' }} />
                        <figcaption>Taupe</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <div className={styles.swatchImage} style={{ backgroundColor: '#F5F5F0' }} />
                        <figcaption>Soft White</figcaption>
                      </figure>
                    </div>
                    <p className={styles.swatchGridCaption}>Key Neutral Palette Swatches</p>
                  </div>
                </div>
              </div>
              <div className={styles.colorTheoryContent}>
                <h3>Applying Neutral Tones: Maximizing Your Versatility</h3>
                <p>
                  Neutral undertones offer the most versatility in color choices. You can wear both warm and cool colors successfully, making you adaptable to many styles. Focus on muted, sophisticated tones like sage, dusty rose, taupe, and soft white. Both gold and silver jewelry work beautifully. Experiment with a wide color palette to discover what makes you feel most confident.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
