import { DataTableDemo } from "@/components/demo";
import Image from "next/image";
import Link from "next/link";
import { FiAlignLeft } from "react-icons/fi";
const data = [
  {
    id: "hasan",
    amount: 316,
    status: "no",
    email: "ken99@hsahfdj.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];
export default function Home() {
  return (
    <main>
      {/* <DataTableDemo data={data} /> */}
      <div>
        <div className="h-[8vh] bg-[#05595B] w-full ">
          <div className="flex justify-between items-center h-full my-auto mx-10">
            <div className="flex gap-6 items-center ">
              <FiAlignLeft size={25} color="white" />

              <h2 className="text-white ">Raj-Dhola</h2>
            </div>
            <div>
              <h2 className="text-white">Home</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
