import React from "react";
import { LinkProps } from "../interface/";

const Link: React.FC<LinkProps> = ({ link }) => {
  return (
    <div>
      <div>
        {link.description} ({link.url}){" "}
        {link.createdAt ? link.createdAt.toString() : ""}
      </div>
    </div>
  );
};

export default Link;
