import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BattleGaming Tournaments | Competitive Call of Duty Events & Prizes',
  description: 'Join exclusive BattleGaming Call of Duty tournaments. Win premium accounts, cash prizes, and compete against elite players. Monthly tournaments with verified leaderboards.',
  keywords: 'Call of Duty tournament, competitive gaming, gaming tournaments, COD esports',
  openGraph: {
    title: 'BattleGaming Tournaments | Competitive COD Events',
    description: 'Compete in exclusive tournaments and win premium Call of Duty accounts and cash prizes.',
    url: 'https://battlegaming.com/tournament',
    type: 'website',
  },
  alternates: {
    canonical: 'https://battlegaming.com/tournament',
  },
};

export default function Tournament() {
  const tournaments = [
    {
      id: 1,
      name: 'Elite 1v1 Championship',
      prize: '$5,000',
      players: '256',
      status: 'Registration Open',
      date: 'May 15-17, 2026',
      description: '1v1 multiplayer matches with single elimination bracket'
    },
    {
      id: 2,
      name: 'Squad Battle Royale',
      prize: '$10,000',
      players: '64 Teams',
      status: 'Registration Open',
      date: 'May 22-24, 2026',
      description: '4v4 squad-based battle royale tournament'
    },
    {
      id: 3,
      name: 'Premium Account Race',
      prize: '10x Premium Accounts',
      players: '512',
      status: 'Upcoming',
      date: 'June 5-7, 2026',
      description: 'Win premium Call of Duty accounts with elite stats'
    }
  ];

  return (
    <div className="bg-[#0d071a] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6 text-[#FF7828]">
            BattleGaming Tournaments
          </h1>
          <p className="text-xl text-gray-300">
            Compete against elite players, win exclusive prizes, and prove your skills in our verified tournaments.
          </p>
        </div>
      </section>

      {/* Tournament Info */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF7828] mb-6">Active Tournaments</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {tournaments.map((tournament) => (
                <div key={tournament.id} className="bg-[#1a1a3e]/60 p-6 rounded-lg border border-[#FF7828]/30 hover:border-[#FF7828] transition-colors">
                  <h3 className="text-xl font-bold text-[#FF7828] mb-3">{tournament.name}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-300">
                      <span className="text-[#FF7828] font-bold">Prize Pool:</span> {tournament.prize}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-[#FF7828] font-bold">Players:</span> {tournament.players}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-[#FF7828] font-bold">Date:</span> {tournament.date}
                    </p>
                    <p className="text-gray-400 text-sm">{tournament.description}</p>
                  </div>
                  <button className="w-full bg-[#FF7828] text-black font-bold py-2 rounded-lg hover:bg-[#E86B1F] transition-colors">
                    {tournament.status}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tournament Rules */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#FF7828] mb-6">Tournament Rules & Guidelines</h2>
            <div className="bg-[#1a1a3e]/40 p-8 rounded-lg border border-[#FF7828]/20">
              <h3 className="text-xl font-bold text-[#FF7828] mb-4">✓ Eligibility Requirements</h3>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Must be 18+ years old to participate</li>
                <li>• Valid gaming account with verified stats</li>
                <li>• Clean tournament history required</li>
                <li>• Registration fee (varies by tournament)</li>
              </ul>

              <h3 className="text-xl font-bold text-[#FF7828] mb-4">✓ Competition Format</h3>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Single or double elimination brackets</li>
                <li>• Best of 3 or 5 matches depending on round</li>
                <li>• Verified admin oversight for all matches</li>
                <li>• Live streaming available for select matches</li>
              </ul>

              <h3 className="text-xl font-bold text-[#FF7828] mb-4">✓ Prize Distribution</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 1st Place: 50% of prize pool</li>
                <li>• 2nd Place: 30% of prize pool</li>
                <li>• 3rd Place: 20% of prize pool</li>
                <li>• Prizes distributed within 48 hours</li>
              </ul>
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="text-3xl font-bold text-[#FF7828] mb-6">Global Leaderboard</h2>
            <div className="bg-[#1a1a3e]/40 p-6 rounded-lg border border-[#FF7828]/20 overflow-x-auto">
              <table className="w-full text-gray-300">
                <thead>
                  <tr className="border-b border-[#FF7828]/30">
                    <th className="text-left py-3 text-[#FF7828]">Rank</th>
                    <th className="text-left py-3 text-[#FF7828]">Player</th>
                    <th className="text-left py-3 text-[#FF7828]">Wins</th>
                    <th className="text-left py-3 text-[#FF7828]">Tournament Points</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <tr key={rank} className="border-b border-[#FF7828]/10">
                      <td className="py-3">{rank}</td>
                      <td className="py-3">Player {rank}</td>
                      <td className="py-3">{45 - rank * 5}</td>
                      <td className="py-3 text-[#FF7828] font-bold">{5500 - rank * 500}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
