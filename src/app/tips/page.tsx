import Link from 'next/link';
import styles from './page.module.scss';

export default function TipsPage() {
  return (
    <div className={styles.tipsPage}>
      <nav className={styles.topNav}>
        <div className={styles.topNavContainer}>
          <Link href="/" className={styles.topNavLink}>Home</Link>
          <Link href="/dashboard" className={styles.topNavLink}>Dashboard</Link>
          <Link href="/generate" className={styles.topNavLink}>Generate</Link>
          <Link href="/tips" className={styles.topNavLinkActive}>Tips</Link>
        </div>
      </nav>
      <div className={styles.pageContainer}>
        <div className={styles.mainWrapper}>
          <aside className={styles.sidebar}>
            <header className={styles.sidebarHeader}>
              <h1>Mastering Your Personal Color Harmony</h1>
            </header>
            <nav className={styles.sidebarNav}>
              <ul>
                <li>
                  <a className={styles.activeNavItem} href="#">Warm Tones</a>
                </li>
                <li>
                  <a className={styles.navItem} href="#">Cool Tones</a>
                </li>
                <li>
                  <a className={styles.navItem} href="#">Neutral Tones</a>
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
                      alt="Woman with warm undertones"
                      className={styles.portraitImage}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSKw7aqTr_2EXlfZsAEC5bTHZ3okcakrIJzfB0CGiEz2nvBloFXcPkvyzQK1K-QR4qSEoDZE7o1tWS_wY4L2PmkTB3quEgJkk_2Jz1Bwk4u0wwaFiepQm__3j0bh9tp13Xkl8OftX0Q4ng4Upysk2Mb_H2FInBGF_pMVd99GKGYNDclcQgGliuG1lWal4sEi_8ycJvxZ-yWE8n16nwmSa3lPcrOz-KHltu6wtttD0Pb8L5fs2EV-dcMnNEA0H6EvFq8cp9f0u3SdY"
                    />
                    <figcaption>Figure 1: Warm Undertone Manifestation with Gold & Earth Tones</figcaption>
                  </figure>
                </div>
                <div className={styles.flexCol}>
                  <div className={styles.swatchGridContainer}>
                    <div className={styles.swatchGrid}>
                      <figure className={styles.swatchItem}>
                        <img alt="Golden Hour fabric swatch" className={styles.swatchImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUrP3M7E0JKiE-OWkohT8p4w89Cb3HN13V9VM9nSm7TmYCDwLMIIuA-CB1mSv0vMv4L2piDR_yKsVBRfoBHRTCzSbru6v0m_4BmrCXZ65na4TwrhedW51grW3Ipg7mOpmNMQkodgnxoXzJ9BrmOustUWWrljmKJ6MPIXrajxr-F6OX8TJkdwRbibX8_GgC8D2pJfSsT4XtuIxnoUAiHQ7JR67umuCHUbRig9jjPAr2QnnYc6DyyhUZ2KuzWsLdGg68TNThMSsdGWU" />
                        <figcaption>Golden Hour</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <img alt="Rust fabric swatch" className={styles.swatchImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuARgGnUP-mh4Fukg1xkOikZWdpaEutwUdLL9zjLyoNX5zX4t4nmqc-Z98c2e25GTbcsaCewnMF26dncBs0epjdkH4EkMxjjnqBeW3vJUZ8zwwW5NDQODJ-av5NTMSofhm-RgXRFvIJLRRTkzNh6PhQ__36ZYtwgkb1QnBlXtcC5c9hzrlDB1N9-GdRaliAbykLiiSHGN-65PPSL5fQyEgl3Wsv92RfS5jonlPYG7UE153eWsvIpTfyW3DvHybU3zewlMCvv5ZYXbrY" />
                        <figcaption>Rust</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <img alt="Olive fabric swatch" className={styles.swatchImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9YqLTZuNqFptHr7UAw1L7HYdaUx99feTLiGmj-gaYI48-Xcvz53ClOyb1nmjUt-SVZa-c1vK60RFWp7o9_MU1wah2XhmX5Xesivv0ZaN7wQzTke_wbGCAg71ZGgmyNSbIap50RVuIWKqFFviOOm9aVDf0JbgUte9JmlJzVYxo7fbnnFb3pz5Zi7pv0Pa4r7mgLDEfhWAG0cfI8Lsk-db6H-AKbvRoCe3a47g9c40dWnXuEO4EbIIGMNsvP55n9mlunkdx6H0l2No" />
                        <figcaption>Olive</figcaption>
                      </figure>
                      <figure className={styles.swatchItem}>
                        <img alt="Cream fabric swatch" className={styles.swatchImage} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZrmUbOktBAvErm5tVLvqogOq1FOxEcNXnkFcS0y_ujkm-u8A3vrhcOrPdmi45h7s5uEDwpU4mcCWDasTegPkaAyTwk6C7bjEHE3tEoydIOPhjynLOYuq1Ta-lXQqo6ynSdOaHgJ6Kxo2l2Yq2Ky98TqKRWe27VvCB8NNqOUyI-sB5vEwPG0V7fS84YM8ITp8vxhrkPcuzBYxMG0ibSigATGcYwothKcK2HHj0I0hhrpSiiLqENqPKEVSV0IzRxCJlx_UNKoFXxY8" />
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
          </main>
        </div>
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <nav className={styles.footerNav}>
              <a className={styles.footerLink} href="#">About Us</a>
              <a className={styles.footerLink} href="#">Terms & Conditions</a>
              <a className={styles.footerLink} href="#">Contact</a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
