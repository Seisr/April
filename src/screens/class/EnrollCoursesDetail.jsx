import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { AprilService } from "../../services/AprilServices";
const EnrollCoursesDetail = () => {
  const [subjects, setSubjects] = useState([]);

  const retrieveSubjects = () => {
    AprilService.getAllSubjects()
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveSubjects();
  }, []);
  console.log(subjects);
  return <Text>EnrollCoursesDetail</Text>;
};

export default EnrollCoursesDetail;
