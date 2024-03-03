"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";

type TProps = {
  imageSrc: string;
};

export const PopupModal = (props: TProps): JSX.Element => {
  const { imageSrc } = props;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-[200px]">
          <img src={imageSrc} alt={imageSrc} width={200} height={200} />
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-fit">
        <img
          src={imageSrc}
          alt={imageSrc}
          className="max-h-[84vh] max-w-[inherit] md:max-h-[94vh]"
        />
      </DialogContent>
    </Dialog>
  );
};
