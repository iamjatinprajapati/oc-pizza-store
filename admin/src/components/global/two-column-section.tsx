import { ReactElement } from "react";

type TwoColumnSectionProps = {
  heading: string;
  shortDescription: string;
  children: ReactElement;
};
const TwoColumnSection = ({
  heading,
  shortDescription,
  children,
}: TwoColumnSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {heading}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {shortDescription}
        </p>
      </div>
      {children}
    </div>
  );
};

export default TwoColumnSection;
