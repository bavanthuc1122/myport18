'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderPortfolio from '@/components/header-portfolio';
import Footer from '@/components/footer';
import { ScrollProvider } from '@/components/scroll';
import { urlFor } from '@/lib/sanity';

interface HomePageProps {
  homePageData: any;
}

const services = ['LOOKBOOK', 'PORTRAITS', 'COMMERCIAL', 'BEHIND THE SCENES'];
const showcaseNotes = [
  {
    eyebrow: 'Portfolio showcase',
    title: 'Selected frames',
    body: 'A rolling edit of campaign, portrait, and behind-the-scenes images pulled from your Sanity portfolio preview.',
  },
  {
    eyebrow: 'Visual rhythm',
    title: 'Stillness in motion',
    body: 'Large images slide horizontally while the page keeps a vertical scroll habit, so the sequence feels cinematic without losing control.',
  },
];
const processCards = [
  ['01', 'Pre-production', 'Mood, location, lighting, and references are clarified before the camera comes out.'],
  ['02', 'Shoot direction', 'Frames are built with clean movement, controlled contrast, and space for the subject.'],
  ['03', 'Final grade', 'Color, crop, and delivery are refined for campaign, archive, and social formats.'],
];
const stats = [
  ['48+', 'selected campaigns'],
  ['05', 'years shooting'],
  ['16', 'cities covered'],
];

function splitHeroTitle(title?: string) {
  const value = title || 'Van Thuc';
  if (value.toLowerCase().includes('welcome to portfolio')) return ['Welcome', 'to', 'Portfolio'];
  return value.split(' ').reduce<string[]>((lines, word, index) => {
    if (index % 2 === 0) lines.push(word);
    else lines[lines.length - 1] = `${lines[lines.length - 1]} ${word}`;
    return lines;
  }, []);
}

function MaskText({
  lines,
  className = '',
  lineClassName = '',
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
}) {
  return (
    <span data-scroll data-scroll-class="is-revealed" data-scroll-offset="18%" className={`mask-reveal block ${className}`}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="mask-line">
          <span className={`mask-line-inner ${lineClassName}`} style={{ transitionDelay: `${index * 90}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

function MaskLine({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <span className="mask-line">
      <span className="mask-line-inner" style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}

function sanityImage(source: any, width = 1200, height = 1500) {
  if (!source) return null;

  try {
    return urlFor(source).width(width).height(height).fit('crop').url();
  } catch {
    return null;
  }
}

function titleLines(value: string | undefined, fallback: string) {
  return (value || fallback).split(' ').filter(Boolean);
}

function SectionBackground({
  image,
  alt,
  opacity = 'opacity-35',
  overlay = 'bg-black/45',
}: {
  image: string | null;
  alt: string;
  opacity?: string;
  overlay?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${opacity}`}>
      {image ? (
        <div data-scroll data-scroll-speed="-1.2" className="absolute -inset-10 scale-105">
          <Image src={image} alt={alt} fill className="object-cover" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(135deg,#111,#050505_55%,#171717)]" />
      )}
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}

export default function HomePage({ homePageData }: HomePageProps) {
  const horizontalRef = useRef<HTMLElement>(null);
  const hero = homePageData?.hero || {};
  const horizontalShowcase = homePageData?.horizontalShowcase || {};
  const processSection = homePageData?.process || {};
  const servicesSection = homePageData?.services || {};
  const aboutSection = homePageData?.about || {};
  const contactSection = homePageData?.contact || {};

  const heroImage = sanityImage(hero.backgroundImage, 1800, 1200);
  const heroFeaturedImage = sanityImage(hero.featuredImage || hero.backgroundImage, 1400, 900);
  const horizontalBackground = sanityImage(horizontalShowcase.backgroundImage, 1800, 1200);
  const horizontalImages = [
    sanityImage(horizontalShowcase.image1, 1200, 1500),
    sanityImage(horizontalShowcase.image2, 1200, 1500),
    sanityImage(horizontalShowcase.image3, 1200, 1500),
  ];
  const processBackground = sanityImage(processSection.backgroundImage, 1800, 1200);
  const processImages = (processSection.images || []).map((image: any, index: number) =>
    sanityImage(image, index === 0 ? 1100 : 900, 1200)
  );
  const servicesBackground = sanityImage(servicesSection.backgroundImage, 1800, 1200);
  const aboutImage = sanityImage(aboutSection.portraitImage, 900, 1200);
  const aboutBackground = sanityImage(aboutSection.backgroundImage, 1800, 1200);
  const contactBackground = sanityImage(contactSection.backgroundImage, 1800, 1200);
  const heroTitleLines = splitHeroTitle(hero.title);
  const processSteps = processSection.steps?.length ? processSection.steps : processCards.map(([number, title, description]) => ({ number, title, description }));
  const serviceItems = servicesSection.items?.length ? servicesSection.items : services;
  const aboutFeatures = aboutSection.featureCards?.length ? aboutSection.featureCards : ['Natural color grade', 'Clean subject focus', 'Motion aware layout'];
  const contactLines = contactSection.supportingLines?.length
    ? contactSection.supportingLines
    : [
        'Portrait sessions with cinematic restraint.',
        'Commercial images shaped for launch, archive, and campaign.',
        'Behind-the-scenes coverage with texture and pace.',
      ];

  useEffect(() => {
    let frame = 0;

    const updateHorizontalProgress = () => {
      const section = horizontalRef.current;
      if (!section) {
        frame = requestAnimationFrame(updateHorizontalProgress);
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      section.style.setProperty('--horizontal-progress', progress.toString());

      frame = requestAnimationFrame(updateHorizontalProgress);
    };

    frame = requestAnimationFrame(updateHorizontalProgress);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ScrollProvider
      options={{
        smooth: true,
        lerp: 0.06,
        multiplier: 0.85,
        class: 'is-revealed',
        smartphone: { smooth: true, multiplier: 1.4 },
        tablet: { smooth: true, multiplier: 1 },
      }}
    >
    <main className="min-h-screen bg-[#050505] text-[#f6f2ea] selection:bg-[#f6f2ea] selection:text-black">
      <HeaderPortfolio />

      <section data-scroll-section className="relative min-h-screen overflow-hidden px-4 pb-6 pt-24 sm:px-6 lg:px-10 2xl:px-14">
        <SectionBackground image={heroImage} alt={hero.title || 'Hero background'} opacity="opacity-25" overlay="bg-black/60" />
        <div className="relative z-10 flex min-h-[calc(100vh-7.5rem)] w-full flex-col justify-between">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-10">
              <p data-scroll data-scroll-class="is-revealed" className="mask-reveal mb-5 text-xs font-medium uppercase tracking-[0.42em] text-white/55">
                <span className="mask-line">
                  <span className="mask-line-inner">Photography / Visual direction / 2026</span>
                </span>
              </p>
              <h1 className="text-[clamp(4.1rem,13vw,15.5rem)] font-black uppercase leading-[0.76] tracking-normal">
                <MaskText lines={heroTitleLines} />
              </h1>
            </div>
            <div data-scroll data-scroll-class="is-revealed" data-scroll-offset="10%" className="mask-reveal max-w-md justify-self-start pb-3 lg:col-span-2 lg:justify-self-end">
              <p className="mask-line text-base leading-relaxed text-white/72 sm:text-lg">
                <span className="mask-line-inner">
                  {hero.subtitle ||
                    'A cinematic photography portfolio built around quiet contrast, tactile motion, and sharp editorial rhythm.'}
                </span>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/portfolio" className="bg-[#f6f2ea] px-6 py-3 text-sm font-semibold uppercase text-black transition hover:bg-white">
                  View work
                </Link>
                <Link href="/contact" className="bg-white/10 px-6 py-3 text-sm font-semibold uppercase text-white transition hover:bg-white/15">
                  Book a shoot
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-3 lg:min-h-[38vh] lg:grid-cols-[1fr_1.8fr_0.8fr] 2xl:min-h-[42vh]">
            <div data-scroll data-scroll-class="is-revealed" data-scroll-offset="14%" className="mask-reveal flex flex-col justify-between bg-white/[0.03] p-5">
              <span className="text-xs uppercase tracking-[0.32em] text-white/45">
                <MaskLine>Studio note</MaskLine>
              </span>
              <p className="mt-16 text-2xl font-semibold leading-tight">
                
                <span className="mask-line"><span className="mask-line-inner" style={{ transitionDelay: '90ms' }}></span></span>
              </p>
            </div>
            <div data-scroll data-scroll-class="is-revealed" data-scroll-offset="14%" className="image-reveal relative min-h-[360px] overflow-hidden bg-white/5 sm:min-h-[460px] lg:min-h-full">
              {heroFeaturedImage ? (
                <div data-scroll data-scroll-speed="-1" className="absolute -inset-8 scale-105">
                  <Image src={heroFeaturedImage} alt={hero.title || 'Portfolio hero'} fill priority className="object-cover transition-transform duration-700 will-change-transform" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#1b1b1b,#080808_45%,#d9d1c3_45%,#d9d1c3_48%,#111_48%)]" />
              )}
              <div className="absolute inset-0 bg-black/5" />
            </div>
            <div className="grid grid-cols-3 bg-white/[0.03] lg:grid-cols-1">
              {stats.map(([value, label], index) => (
                <div
                  key={label}
                  data-scroll
                  data-scroll-class="is-revealed"
                  data-scroll-offset="14%"
                  className="mask-reveal p-4"
                >
                  <strong className="block text-3xl font-black">
                    <MaskLine delay={index * 60}>{value}</MaskLine>
                  </strong>
                  <span className="mask-line mt-2 text-xs uppercase tracking-[0.18em] text-white/45">
                    <span className="mask-line-inner" style={{ transitionDelay: `${index * 90}ms` }}>{label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={horizontalRef}
        data-scroll-section
        className="horizontal-scroll-section relative [--horizontal-progress:0]"
        style={{ height: horizontalShowcase.scrollHeight || '300vh' }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <SectionBackground image={horizontalBackground || horizontalImages[0]} alt="Portfolio horizontal background" opacity="opacity-22" overlay="bg-black/42" />
          <div
            className="horizontal-track relative z-10 flex h-screen w-max flex-nowrap items-center gap-5 px-4 py-16 will-change-transform sm:px-6 lg:px-10 2xl:px-14"
            style={{ transform: 'translate3d(calc(var(--horizontal-progress) * -210vw), 0, 0)' }}
          >
            <Link href="/portfolio" className="relative h-[72vh] w-[54vw] shrink-0 overflow-hidden bg-white/[0.04]">
              {horizontalImages[0] ? (
                <Image src={horizontalImages[0]} alt="Portfolio horizontal image 1" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#444,#080808_58%)]" />
              )}
            </Link>

            <div className="flex h-[72vh] w-[34vw] shrink-0 flex-col justify-between bg-black/12 p-8 backdrop-blur-[2px]">
              <div>
                <p data-scroll data-scroll-class="is-revealed" className="mask-reveal mb-5 text-xs uppercase tracking-[0.42em] text-white/55">
                  <MaskLine>Portfolio showcase</MaskLine>
                </p>
                <h2 className="text-[clamp(3rem,6.5vw,7rem)] font-black uppercase leading-[0.84]">
                  <MaskText lines={titleLines(horizontalShowcase.text1?.title, 'Selected frames')} />
                </h2>
              </div>
              <p data-scroll data-scroll-class="is-revealed" className="mask-reveal max-w-md text-base leading-relaxed text-white/68">
                <MaskLine>{horizontalShowcase.text1?.description || showcaseNotes[0].body}</MaskLine>
              </p>
            </div>

            {[horizontalImages[1], horizontalImages[2]].map((src, index) => (
              <Link key={index} href="/portfolio" className="relative h-[72vh] w-[46vw] shrink-0 overflow-hidden bg-white/[0.04]">
                {src ? (
                  <Image src={src} alt={`Portfolio horizontal image ${index + 2}`} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#444,#080808_58%)]" />
                )}
              </Link>
            ))}

            <div className="flex h-[72vh] w-[34vw] shrink-0 flex-col justify-between bg-black/12 p-8 backdrop-blur-[2px]">
              <div>
                <p data-scroll data-scroll-class="is-revealed" className="mask-reveal mb-5 text-xs uppercase tracking-[0.42em] text-white/55">
                  <MaskLine>{horizontalShowcase.text2?.eyebrow || 'Visual rhythm'}</MaskLine>
                </p>
                <h2 className="text-[clamp(3rem,6.5vw,7rem)] font-black uppercase leading-[0.84]">
                  <MaskText lines={titleLines(horizontalShowcase.text2?.title, showcaseNotes[1].title)} />
                </h2>
              </div>
              <p data-scroll data-scroll-class="is-revealed" className="mask-reveal max-w-md text-base leading-relaxed text-white/68">
                <MaskLine>{horizontalShowcase.text2?.description || showcaseNotes[1].body}</MaskLine>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section data-scroll-section className="contact-section relative overflow-hidden px-4 py-12 sm:px-6 sm:py-20 lg:px-10 lg:py-28 2xl:px-14">
        <SectionBackground image={processBackground} alt="Process background" opacity="opacity-18" overlay="bg-black/62" />
        <div className="relative z-10 grid min-h-[86vh] w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="flex flex-col justify-between bg-black/10 p-6 backdrop-blur-[2px] sm:p-10">
            <div>
              <p data-scroll data-scroll-class="is-revealed" className="mask-reveal mb-6 text-xs uppercase tracking-[0.42em] text-white/50">
                <span className="mask-line"><span className="mask-line-inner">{processSection.copy?.eyebrow || 'Session 03 / Process'}</span></span>
              </p>
              <h2 className="text-[clamp(3.3rem,8vw,9rem)] font-black uppercase leading-[0.84]">
                <MaskText lines={titleLines(processSection.copy?.title, 'Built with intention')} />
              </h2>
            </div>
            <div className="mt-10 space-y-2">
              {processSteps.map((step: any, index: number) => (
                <div
                  key={step.title || index}
                  data-scroll
                  data-scroll-class="is-revealed"
                  className="mask-reveal grid gap-4 py-5 sm:grid-cols-[64px_0.7fr_1fr]"
                >
                  <span className="text-sm text-white/35">{step.number || `0${index + 1}`}</span>
                  <span className="mask-line text-xl font-semibold uppercase">
                    <span className="mask-line-inner" style={{ transitionDelay: `${index * 70}ms` }}>{step.title}</span>
                  </span>
                  <span className="mask-line text-sm leading-relaxed text-white/55">
                    <span className="mask-line-inner" style={{ transitionDelay: `${index * 90}ms` }}>{step.description}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[processImages[0], processImages[1]].map((src, index) => (
              <div
                key={index}
                data-scroll
                data-scroll-class="is-revealed"
                className={`image-reveal relative min-h-[42vh] overflow-hidden bg-white/[0.04] ${index === 1 ? 'md:mt-20' : ''}`}
              >
                {src ? (
                  <Image src={src} alt={`Process image ${index + 1}`} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#444,#080808_60%)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-scroll-section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10 lg:py-28 2xl:px-14">
        <SectionBackground image={servicesBackground} alt="Services background" opacity="opacity-16" overlay="bg-black/70" />
        <div className="relative z-10 grid min-h-[78vh] w-full gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p data-scroll data-scroll-class="is-revealed" className="mask-reveal mb-6 text-xs uppercase tracking-[0.42em] text-white/50">
              <span className="mask-line"><span className="mask-line-inner">{servicesSection.copy?.eyebrow || 'Session 04 / Services'}</span></span>
            </p>
            <h2 className="text-[clamp(3rem,7vw,8rem)] font-black uppercase leading-[0.84]">
              <MaskText lines={titleLines(servicesSection.copy?.title, 'Frames for every brief')} />
            </h2>
          </div>
          <div className="space-y-2">
            {serviceItems.map((service: string, index: number) => (
              <Link key={service} href="/portfolio" className="group grid gap-4 py-7 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                <span className="text-sm text-white/35">0{index + 1}</span>
                <span data-scroll data-scroll-class="is-revealed" className="mask-reveal text-[clamp(2.2rem,6vw,5.8rem)] font-black uppercase leading-none">
                  <span className="mask-line">
                    <span className="mask-line-inner" style={{ transitionDelay: `${index * 80}ms` }}>{service}</span>
                  </span>
                </span>
                <span className="text-sm uppercase tracking-[0.24em] text-white/40 transition group-hover:text-white">Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section data-scroll-section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10 lg:py-28 2xl:px-14">
        <SectionBackground image={aboutBackground || aboutImage} alt="About background" opacity="opacity-20" overlay="bg-black/60" />
        <div className="relative z-10 grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div data-scroll data-scroll-class="is-revealed" className="image-reveal relative min-h-[54vh] overflow-hidden bg-white/[0.04] md:min-h-[70vh] lg:min-h-[76vh]">
            {aboutImage ? (
              <Image src={aboutImage} alt={aboutSection.copy?.title || 'About Van Thuc'} fill className="object-cover object-[50%_38%]" />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,#4a4a4a,#080808_54%)]" />
            )}
            <div className="pointer-events-none absolute inset-x-6 bottom-6 pt-3 text-xs uppercase tracking-[0.28em] text-white/65">
              Editorial frame / free crop
            </div>
          </div>
          <div className="flex min-h-[62vh] flex-col justify-between bg-black/10 p-6 backdrop-blur-[2px] sm:p-10 lg:min-h-[76vh]">
            <div>
              <p data-scroll data-scroll-class="is-revealed" className="mask-reveal mb-6 text-xs font-medium uppercase tracking-[0.42em] text-white/45">
                <span className="mask-line"><span className="mask-line-inner">{aboutSection.copy?.eyebrow || 'Session 05 / About'}</span></span>
              </p>
              <h2 className="text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.86]">
                <MaskText lines={titleLines(aboutSection.copy?.title, 'Frame by frame')} />
              </h2>
            </div>
            <p data-scroll data-scroll-class="is-revealed" className="mask-reveal mt-14 max-w-3xl text-xl leading-relaxed text-white/65">
              <span className="mask-line">
                <span className="mask-line-inner">
                  {aboutSection.copy?.description ||
                    'I shape visual stories for people, products, and places with a restrained palette, deliberate composition, and a focus on atmosphere.'}
                </span>
              </span>
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {aboutFeatures.map((text: string, index: number) => (
                <div
                  key={text}
                  data-scroll
                  data-scroll-class="is-revealed"
                  className="mask-reveal bg-white/[0.04] p-4 text-sm uppercase tracking-[0.16em] text-white/55"
                >
                  <span className="mask-line">
                    <span className="mask-line-inner" style={{ transitionDelay: `${index * 80}ms` }}>{text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-scroll-section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10 lg:py-28 2xl:px-14">
        <SectionBackground image={contactBackground} alt="Contact background" opacity="opacity-22" overlay="bg-black/68" />
        <div className="relative z-10 ml-0 w-full max-w-none text-left">
          <p data-scroll data-scroll-class="is-revealed" className="mask-reveal mb-8 text-xs font-medium uppercase tracking-[0.42em] text-white/45">
            <span className="mask-line"><span className="mask-line-inner">{contactSection.copy?.eyebrow || 'Session 06 / Contact'}</span></span>
          </p>
          <Link href={contactSection.buttonLink || '/contact'} className="group block py-4 text-left sm:py-8">
            <span className="block text-left text-[clamp(3rem,18vw,13rem)] font-black uppercase leading-[0.82] sm:leading-[0.78]">
              <MaskText lines={titleLines(contactSection.copy?.title, 'Let us shoot')} />
            </span>
            <span data-scroll data-scroll-class="is-revealed" className="mask-reveal mt-6 inline-flex sm:mt-8">
              <span className="mask-line">
                <span className="mask-line-inner bg-[#f6f2ea] px-6 py-3 text-sm font-semibold uppercase text-black transition group-hover:bg-white">
                  {contactSection.buttonText || 'Start a conversation'}
                </span>
              </span>
            </span>
          </Link>
          <div className="mt-6 grid max-w-5xl gap-3 text-left text-xs uppercase tracking-[0.16em] text-white/45 sm:mt-10 sm:gap-4 sm:text-sm md:grid-cols-3">
            {contactLines.map((text: string, index: number) => (
              <p key={text} data-scroll data-scroll-class="is-revealed" className="mask-reveal">
                <span className="mask-line">
                  <span className="mask-line-inner" style={{ transitionDelay: `${index * 80}ms` }}>{text}</span>
                </span>
              </p>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </ScrollProvider>
  );
}
