import { useEffect, useState } from "react";
import Tree1 from "./tree1";
import Tree2 from "./tree2";
import { courses } from "./course-data";

export default function TreeDisplay() {
  let starterCourse = "PHYS 3122"
  const [searchCount, setSearchCount] = useState(0);
  const [isShowingTree1, setIsShowingTree1] = useState(true);
  const [course, setCourse] = useState(starterCourse);
  const [courseHistory, setCourseHistory] = useState<string[]>([starterCourse]);

  return (
    <div>
      <button disabled={courseHistory.length <= 1} onClick={() => {
        setCourse(courseHistory[courseHistory.length - 2]);
        setCourseHistory(currCourseHistory => currCourseHistory.slice(0, -1));
      }}>back</button>
      
      <input type="text" placeholder="CS 4261" onChange={e => {
        let courseInput = e.currentTarget.value.toUpperCase();
        if (courses.has(courseInput)) {
          setSearchCount(currSearchCount => currSearchCount + 1);
          setCourse(courseInput);
          setCourseHistory(currCourseHistory => (currCourseHistory[currCourseHistory.length - 1] != courseInput ? [...currCourseHistory, courseInput] : currCourseHistory));
        }
      }}></input>
      <div>{course}</div>
      
      {courses.has(course) && isShowingTree1 && <Tree1 course={course} setSearchCount={setSearchCount}/>}
      {courses.has(course) && !isShowingTree1 && <Tree2 course={course} setSearchCount={setSearchCount}/>}

      <div>{searchCount}</div>
      <button onClick={() => {setIsShowingTree1(isShowing => !isShowing)}}>Toggle Tree</button>
    </div>
  );
}