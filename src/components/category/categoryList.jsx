"use client";

import { Updatecate, deleteCate } from "@/serverAction/category";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useFormStatus } from "react-dom";
import AddCategory from "./addCategory";
function CategoryList({ data }) {
  const [confirm, setConfirm] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category.id,
        children:
          category?.children?.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(data);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };
  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = deleteCate.bind(
    null,
    checkedArray.map((item) => ({
      _id: item.value,
    }))
  );
  const handleDelete = async () => {
    try {
      await deleteCategories();
      setDeleteCategoryModal(false);
    } catch (error) {
      console.error("Error deleting categories:", error);
    }
  };
  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };
  const updateCategoriesForm = async () => {
    const form = new FormData();
    let _id, name;

    expandedArray.forEach((item, index) => {
      ({ value: _id, name } = item);
      form.append("_id", _id);
      form.append("name", name);
    });

    checkedArray.forEach((item, index) => {
      ({ value: _id, name } = item);
      form.append("_id", _id);
      form.append("name", name);
    });

    await Updatecate({ _id, name }).then(() => setUpdateCategoryModal(false));
  };
  return (
    <>
      <div className="flex flex-row justify-end items-center py-4">
        <div className="flex  items-center gap-2 pr-8">
          <span className="mr-2   font-semibold text-slate-600">Actions:</span>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
            onClick={() => setConfirm(true)}
          >
            <IoIosAdd size={20} />
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            onClick={deleteCategory}
          >
            <IoIosTrash size={20} />
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
            onClick={updateCategory}
          >
            <IoIosCloudUpload size={20} />
          </button>
        </div>
      </div>
      <div className="w-full pl-14 pt-2">
        <CheckboxTree
          nodes={renderCategories(data)}
          checked={checked}
          expanded={expanded}
          onCheck={(checked) => setChecked(checked)}
          onExpand={(expanded) => setExpanded(expanded)}
          icons={{
            check: <IoIosCheckbox />,
            uncheck: <IoIosCheckboxOutline />,
            halfCheck: <IoIosCheckboxOutline />,
            expandClose: <IoIosArrowForward />,
            expandOpen: <IoIosArrowDown />,
          }}
        />
      </div>
      <div>
        {confirm && <AddCategory data={data} setConfirm={setConfirm} />}
      </div>

      <div>
        {deleteCategoryModal && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[85%] md:w-[50%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1
                  size={25}
                  onClick={() => setDeleteCategoryModal(false)}
                />
              </div>
              <h3 className="text-[20px] text-center py-5 font-Poppins text-[#000000cb]">
                Confirm Delete
              </h3>

              <h5 className="font-semibold pb-2">Expanded category : </h5>
              {expandedArray.map((item, index) => (
                <span key={index}>
                  {" "}
                  <ul className=" pl-4 text-gray-500 list-disc">
                    <li className="gap-2">{item.name} ,</li>
                  </ul>
                </span>
              ))}
              <h5 className="font-semibold ">Checked for delete : </h5>
              {checkedArray.map((item, index) => (
                <span key={index}>
                  <ul className=" pl-4 text-gray-500 list-disc">
                    <li className="gap-2">{item.name} ,</li>
                  </ul>
                </span>
              ))}

              <div className="flex gap-2  justify-center mt-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                >
                  <button
                    type="submit"
                    className="bg-[#cf3232] text-white px-3 rounded-md text-center"
                  >
                    Yes
                  </button>
                </form>

                <button
                  className=" bg-green-700 text-white px-3 rounded-md"
                  onClick={() => {
                    setDeleteCategoryModal(false);
                    setCheckedArray([]);
                    setExpandedArray([]);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {updateCategoryModal && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[90%] 800px:w-[60%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1
                  size={25}
                  onClick={() => setUpdateCategoryModal(false)}
                />
              </div>
              <h3 className="text-[20px] text-center py-5 font-Poppins text-[#000000cb]">
                UpdateCategories
              </h3>

              <h5 className="font-semibold pb-2">Expanded category : </h5>
              {expandedArray.length > 0 &&
                expandedArray.map((item, index) => (
                  <div key={index}>
                    <input
                      value={item.name}
                      placeholder={`Category Name`}
                      onChange={(e) =>
                        handleCategoryInput(
                          "name",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    />

                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInput(
                          "parentId",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    >
                      <option>select category</option>
                      {data.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              <h5 className="font-semibold ">Checked for delete : </h5>
              {checkedArray.length > 0 &&
                checkedArray.map((item, index) => (
                  <div key={index}>
                    <input
                      value={item.name}
                      placeholder={`Category Name`}
                      onChange={(e) =>
                        handleCategoryInput(
                          "name",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    />

                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInput(
                          "parentId",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    >
                      <option>select category</option>
                      {data.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

              <div className="flex gap-2  justify-center mt-3">
                <button
                  className=" bg-[#cf3232] text-white px-3 rounded-md text-center "
                  onClick={updateCategoriesForm}
                >
                  yes
                </button>
                <button
                  className=" bg-green-700 text-white px-3 rounded-md"
                  onClick={() => {
                    setDeleteCategoryModal(false);
                    setCheckedArray([]); // Clear checkedArray
                    setExpandedArray([]); // Clear expandedArray
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CategoryList;
