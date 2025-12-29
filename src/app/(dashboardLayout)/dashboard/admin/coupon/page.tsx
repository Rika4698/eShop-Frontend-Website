/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loading from "@/app/loading";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import CreateCouponModal from "@/components/CouponManagement/CreateCoupon";
import UpdateCoupon from "@/components/CouponManagement/UpdateCoupon";
import { format } from "date-fns";
import {
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
} from "@/redux/features/coupon/couponApi";
import { ICoupon } from "@/types/modal";
import { Pagination } from "@nextui-org/pagination";
import { useState } from "react";
import { toast } from "sonner";
import NoTableDataFound from "@/components/uiElements/NoTableDataFound";
import { Pen, Trash2 } from "lucide-react";

const Coupon = () => {
  const { data: allCoupons, isLoading } = useGetAllCouponsQuery(undefined);
  const [deleteCoupon] = useDeleteCouponMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | null>(null);
  const [selectedEditCoupon, setSelectedEditCoupon] = useState<ICoupon | null>(null);

  const dataPerPage = 6;
  const startIndex = (currentPage - 1) * dataPerPage;
  const paginatedCoupons = allCoupons?.slice(startIndex, startIndex + dataPerPage) || [];
  const totalPages = Math.ceil((allCoupons?.length || 0) / dataPerPage);

  const handleDelete = async () => {
    if (!selectedCoupon) return;
    toast.loading("Deleting coupon...");
    try {
      await deleteCoupon(selectedCoupon.id).unwrap();
      toast.dismiss();
      toast.success("Coupon deleted successfully");
      setDeleteModalOpen(false);
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "This is used in customerCoupon.");
    }
  };
console.log(paginatedCoupons);
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Coupon Management</h1>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          Total Active Coupons: {allCoupons?.length || 0}
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-5 py-2 rounded-lg border-2 border-green-700 text-green-700 font-bold uppercase hover:bg-green-600 hover:text-white transition"
        >
          Create Coupon
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">No</th>
              <th className="p-2 border">Code</th>
              <th className="p-2 border">Discount</th>
              <th className="p-2 border">Expiry</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-4"><Loading /></td>
              </tr>
            ) : paginatedCoupons.length === 0 ? (
              <NoTableDataFound span={5} />
            ) : (
              paginatedCoupons.map((coupon: ICoupon, index: number) => (
                <tr key={coupon.id} className="hover:bg-gray-50 text-center">
                  <td className="p-2 border ">{startIndex + index + 1}</td>
                  <td className="p-2 border">{coupon.code}</td>
                  <td className="p-2 border">
                    {coupon.discountStatus === "PERCENTAGE"
                      ? `${coupon.discountValue}% OFF`
                      : `${coupon.discountValue} TK OFF`}
                  </td>
                  <td className="p-2 border">
                    {format(new Date(coupon.endDate), "MMM dd, yyyy")}
                  </td>
                   <td className=" p-2 flex items-center justify-center ">
                <Dropdown closeOnSelect={true} className="bg-white ">
                  <DropdownTrigger >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-ellipsis cursor-pointer  "
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Actions">
                      {[
    coupon.usedCount === 0 ? (
      <DropdownItem className="bg-white hover:bg-gray-100" key="edit">
        <span onClick={() => {
          setSelectedEditCoupon(coupon);
          setEditModalOpen(true);
        }} className="flex items-center gap-2">
          <Pen className="w-[15px]" />
          Edit
        </span>
      </DropdownItem>
    ) : null,
                 
                    <DropdownItem className="bg-white hover:bg-gray-100" key="delete">
                      <span
                        onClick={() => {
                          setSelectedCoupon(coupon);
                          setDeleteModalOpen(true);
                        }}
                        className="flex items-center gap-2 text-red-600 cursor-pointer "
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </span>
                    </DropdownItem>].filter(Boolean)}
                  </DropdownMenu>
                </Dropdown>
              </td>
                </tr>
              ))
            )}

           
          </tbody>
        </table>
      </div>

      {/* Pagination */}
     {totalPages > 0 && (
  <div className="flex justify-center mt-6 scale-90 sm:scale-100">
    <Pagination
      total={totalPages}
      page={currentPage}
      onChange={setCurrentPage}
      showControls
      variant="light"
      classNames={{
        wrapper: "gap-1",
        item: `
          w-9 h-9
          border border-green-500
          text-green-600
          font-semibold
          rounded-lg
          hover:bg-green-100
          transition
        `,
        cursor: `
          bg-green-600
          text-white
          font-bold
          rounded-lg
          shadow-none
          after:hidden
          before:hidden
        `,
        prev: `
          border border-green-500
          text-green-600
          hover:bg-green-100
          rounded-lg
        `,
        next: `
          border border-green-500
          text-green-600
          hover:bg-green-100
          rounded-lg
        `,
      }}
    />
  </div>
)}

      {/* Create Modal */}
      {isModalOpen && (
        <div  className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3">
          <div className="bg-white w-full max-w-2xl rounded-xl max-h-[90vh] overflow-y-auto">
            <CreateCouponModal onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isEditModalOpen && selectedEditCoupon && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3">
          <div className="bg-white w-full max-w-xl rounded-xl max-h-[90vh] overflow-y-auto">
            <UpdateCoupon
              singleCoupon={selectedEditCoupon}
              onClose={() => setEditModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3">
          <div className="bg-white w-full max-w-sm rounded-lg p-5">
            <h3 className="font-bold mb-4">Delete this coupon?</h3>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupon;