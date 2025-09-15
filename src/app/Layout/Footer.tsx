import React from "react";
import Link from "next/link";

function Footer() {
  const content = [
    {
      id: 1,
      title: "Pages",
      routes: [
        { name: "Home", href: "/" },
        { name: "How It Works", href: "/" },
        { name: "About Us", href: "/" },
        { name: "Our Hosts", href: "/" },
      ],
    },
    {
      id: 2,
      title: "Use Cases",
      routes: [
        { name: "For Hosts", href: "/" },
        { name: "For Guests", href: "/" },
      ],
    },
    {
      id: 3,
      title: "Learn",
      routes: [
        { name: "Blog", href: "/" },
        { name: "Help Center", href: "/" },
      ],
    },
    {
      id: 4,
      title: "Socials",
      routes: [
        { name: "Instagram", href: "/" },
        { name: "Linkedin", href: "/" },
        { name: "Facebook", href: "/" },
      ],
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Video */}
      <video
        src="/videos/blog.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto pt-[80px]">
        {/* Tagline */}
        <p className="font-medium text-[32px] md:text-[48px] lg:text-[60px] leading-tight md:leading-[70px] text-center max-w-[892px] mx-auto text-white">
          <span className="text-[22px] md:text-[26px] font-medium leading-tight">
            turning
          </span>{" "}
          Stays into stories{" "}
          <span className="text-[24px] md:text-[28px] font-medium leading-tight">
            and
          </span>{" "}
          Properties into Experiences
        </p>

        {/* CTA */}
        <div className="flex justify-center py-[71px]">
          <button className="px-[40px] cursor-pointer py-[16px] text-black bg-[#EFFC76] hover:bg-[#eef98f] rounded-md shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)]">
            Register Now
          </button>
        </div>

        {/* Footer Links */}
        <div className="flex w-[250px] sm:w-full gap-[20px] px-[10px] justify-between flex-wrap">
          {content.map((item) => (
            <div key={item.id}>
              <p className="font-medium text-[16px] leading-[20px] mb-[24px] text-white opacity-90">
                {item.title}
              </p>
              <ul className="space-y-3">
                {item.routes.map((route, index) => (
                  <li key={index}>
                    <Link
                      href={route.href}
                      className="text-[14px] font-bold text-[#969696]  hover:text-white cursor-pointer transition-colors"
                    >
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between pt-[71px] pb-[40px] px-1 sm:px-0 text-white/80">
          <p className="text-[10px] sm:text-[12px] font-medium">
            2025 @ Rental Host Certification. All rights reserved.
          </p>
          <p className="font-medium text-[10px] sm:text-[12px] leading-[16px]">
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
