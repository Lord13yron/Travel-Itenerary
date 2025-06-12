import { type ReactNode } from "react";
import { HiXMark } from "react-icons/hi2";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  return (
    isOpen && (
      <div className="fixed flex h-full w-full top-0 left-0 backdrop-blur-sm items-center justify-center z-10">
        <div className="flex flex-col  w-100 bg-white rounded-lg shadow-lg p-4">
          <HiXMark
            onClick={() => setIsOpen(false)}
            className="hover:cursor-pointer text-red-600 text-xl"
          />
          {children}
        </div>
      </div>
    )
  );
}
