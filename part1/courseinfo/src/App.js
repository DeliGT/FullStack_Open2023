function CourseTitle({ courseName }) {
  return <h1>{courseName}</h1>;
}

function CoursePart({ partName, partExercises }) {
  return (
    <p>{partName} <span>{partExercises}</span></p>
  );
}

function CourseContent({ courseData }) {
  return (
    <div>
      <CoursePart partName={courseData.parts[0].name} partExercises={courseData.parts[0].exercises} />
      <CoursePart partName={courseData.parts[1].name} partExercises={courseData.parts[1].exercises} />
      <CoursePart partName={courseData.parts[2].name} partExercises={courseData.parts[2].exercises} />
    </div>
  );
}

function CourseTotal({ partsData }) {
  return (
    <h1>{partsData[0].exercises + partsData[1].exercises + partsData[2].exercises}</h1>
  );
}

function App() {
  const courseTitle = "Half Stack application development";

  const courseInfo = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <CourseTitle courseName={courseTitle} /> 
      <CourseContent courseData={courseInfo} />  
      <CourseTotal partsData={courseInfo.parts} /> 
    </div>
  );
}

export default App;
