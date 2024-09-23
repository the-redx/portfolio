import { Footer } from '@/components/Footer';
import { LinksBody } from '@/components/LinksBody';

export default async function LinkShortenerPage() {
  return (
    <div className="flex flex-col h-lvh">
      <main className="flex flex-col items-center justify-center grow text-center pt-20">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Link Shortener</h1>

        <p className="mt-3 text-lg leading-8 ">
          URL shortener allows to create a shortened link making it easy to share
        </p>

        <LinksBody />
      </main>

      <Footer />
    </div>
  );
}
