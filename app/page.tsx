import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Bio from '@/components/Bio';
import Studio from '@/components/Studio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Works from '@/components/Credits';
import News from '@/components/News';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Bio />
      <Works />
      <News />
      <Studio />
      <Contact />
      <Footer />
    </main>
  );
}

