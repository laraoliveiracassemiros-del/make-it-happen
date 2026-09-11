import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MissionComposer } from '@/components/MissionComposer';

export default function MakePage() {
  return (
    <main className="shell">
      <Nav />
      <MissionComposer />
      <Footer />
    </main>
  );
}
