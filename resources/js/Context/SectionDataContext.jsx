import { createContext } from "react";
import { useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";

export const SectionDataContext = createContext(null);

const fieldData = [
  {
      id : 1,
      name : "Rich Text",
      type : "textarea",
      options : [],
  },
  {
      id : 2,
      name : "Text",
      type : "text",
      options : [],
  },
  {
      id : 3,
      name : "Number",
      type : "number",
      options : [],
  },
  {
      id : 4,
      name : "Date Time",
      type : "datetime",
      options : [],
  },
  {
      id : 5,
      name : "Media",
      type : "file",
      options : [
          {
              'label' : "One File",
              'value' : 'one'
          },
          {
              'label' : "Many File",
              'value' : 'many'
          },
      ],
  },
  {
      id : 6,
      name : "Boolean",
      type : "boolean",
      options : [],
  },
  {
      id : 7,
      name : "Color",
      type : "color",
      options : [],
  },
]

export const SectionDataProvider = ({ children }) => {
  const [visibleField, setVisibleField] = useState(false);
  const [visibleDesign, setVisibleDesign] = useState(false);
  const [visibleComponent, setVisibleComponent] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleCreateCptModal, setVisbileCreateCptModal] = useState(false)
  const [visibleCreateDesignModal, setVisibleCreateDesignModal] = useState(false)
  const [editFieldVisible, setEditFieldVisible] = useState(false)
  const [errors, setErrors] = useState([]);
  const {section_id} = usePage().props;
  const { data, setData, reset } = useForm({
      name: "",
      value: "",
      type: "",
      option : "",
      section_id : section_id,
      isShow: "no",
  });

  

  return (
    <SectionDataContext.Provider
      value={{
        setVisibleComponent,
        setVisibleField,
        setVisibleCreateModal,
        setVisbileCreateCptModal,
        setVisibleCreateDesignModal,
        setVisibleDesign,
        setEditFieldVisible,
        setErrors,
        setData,
        reset,
        errors,
        visibleField,
        visibleComponent,
        visibleCreateModal,
        visibleCreateCptModal,
        visibleCreateDesignModal,
        editFieldVisible,
        visibleDesign,
        fieldData,
        data, 
        section_id,
      }}
    >
      {children}
    </SectionDataContext.Provider>
  );
};
