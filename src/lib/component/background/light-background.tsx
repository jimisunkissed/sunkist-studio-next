import { ReactNode } from 'react';

export function LightBackground(): ReactNode {
  return (
    <>
      <div className="fixed top-0 h-screen w-screen bg-white -z-20" />
      <div className="fixed top-0 h-screen w-screen bg-gradient-to-b from-yellow-200 to-transparent -z-20" />
      <div className="fixed top-0 h-screen w-screen bg-[radial-gradient(circle_at_bottom_left,_#7dd3fc,_transparent)] opacity-80 -z-20" />
      <div className="fixed top-0 h-screen w-screen bg-[radial-gradient(circle_at_bottom_right,_#f9a8d4,_transparent)] opacity-80 -z-20" />
    </>
  );
}
