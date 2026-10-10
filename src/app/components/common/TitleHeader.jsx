import React from "react";

function TitleHeader({
  title,
  titleStyle = "text-[20px]",
  subtitle = "",
  subtitleStyle = "text-[16px]",
  style,
}) {
  return (
    <div className={`my-4 sm:my-5 ${style}`}>
      <h1
        className={`text-2xl font-bold text-primary-text-color  ${titleStyle}`}
      >
        {title}
      </h1>
      <p
        className={`mt-2 text-sm leading-relaxed text-secondary-text-color sm:text-base ${subtitleStyle}`}
      >
        {subtitle}
      </p>
    </div>
  );
}

export default TitleHeader;
