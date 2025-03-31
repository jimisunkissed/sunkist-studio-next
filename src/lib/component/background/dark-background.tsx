import { ReactNode } from 'react';

export function DarkBackground(): ReactNode {
  return (
    <>
      <div className="fixed top-0 h-screen w-screen bg-black -z-20" />
      <div className="fixed top-0 h-screen w-screen bg-gradient-to-b from-slate-950 to-transparent -z-20" />
      <div className="fixed top-0 h-screen w-screen bg-[radial-gradient(circle_at_bottom_left,_#1a2e05,_transparent)] opacity-50 -z-20" />
      <div className="fixed top-0 h-screen w-screen bg-[radial-gradient(circle_at_bottom_right,_#1e1b4b,_transparent)] opacity-50 -z-20" />
    </>
  );
}
