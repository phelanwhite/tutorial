import { links } from "@/constants/link.constant";
import ButtonSocialMedias from "@/features/authentication/components/ButtonSocialMedias";
import React, { memo } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 p-4 shadow space-y-4">
      <ul className=" flex flex-wrap items-center justify-center gap-4">
        {links.map((link) => (
          <li key={link.name}>
            <NavLink to={link.path}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
      <div>
        <ButtonSocialMedias />
      </div>
    </header>
  );
};

export default memo(Header);
