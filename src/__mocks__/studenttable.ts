import { mock } from "../lib/axios";
import { StudentTable } from "../types/studenttable";

const students: StudentTable[] = [
  {
    rollno: "1",
    name: "abhishek",
    email: "abhi@gmail.com",
    gender: "male",
    english: 56,
    math: 76,
    science: 65,
    total: 178,
  },
  {
    rollno: "2",
    name: "sac",
    email: "sac@gmail.com",
    gender: "male",
    english: 55,
    math: 76,
    science: 65,
    total: 278,
  },
  {
    rollno: "3",
    name: "rohit",
    email: "rohit@gmail.com",
    gender: "male",
    english: 56,
    math: 46,
    science: 25,
    total: 128,
  },
  {
    rollno: "4",
    name: "aman",
    email: "aman@gmail.com",
    gender: "male",
    english: 36,
    math: 26,
    science: 65,
    total: 128,
  },
  {
    rollno: "5",
    name: "alex",
    email: "alex@gmail.com",
    gender: "male",
    english: 56,
    math: 76,
    science: 25,
    total: 155,
  },
  {
    rollno: "6",
    name: "fiza",
    email: "fiza@gmail.com",
    gender: "female",
    english: 56,
    math: 76,
    science: 65,
    total: 178,
  },
  {
    rollno: "7",
    name: "anurag",
    email: "anurag@gmail.com",
    gender: "male",
    english: 56,
    math: 76,
    science: 65,
    total: 178,
  },
  {
    rollno: "8",
    name: "priya",
    email: "priya@gmail.com",
    gender: "female",
    english: 56,
    math: 26,
    science: 65,
    total: 123,
  },
  {
    rollno: "9",
    name: "hritik",
    email: "hritik@gmail.com",
    gender: "male",
    english: 56,
    math: 76,
    science: 65,
    total: 177,
  },
  // {
  //   rollno: "10",
  //   name: "vikarnt",
  //   email: "vik@gmail.com",
  //   gender: "male",
  //   english: 26,
  //   math: 26,
  //   science: 15,
  //   total: 78,
  // },
];

mock.onGet("/api/student/table").reply(200, { students });

// mock.onGet("/studentform/", { params: { searchId: "1" } }).reply(200, {
//   students: [
//     {
//       rollno: "1",
//       name: "abhishek",
//       email: "abhi@gmail.com",
//       gender: "male",
//       english: 56,
//       math: 76,
//       science: 65,
//       total: 178,
//     },
//   ],
// });

mock.onGet("/studentform/").reply((config) => {
  try {
    const stud = config.params;

    let results = students;
    if (stud) {
      // let data = config.params;
      // console.log(data.rollno);

      //  results = results.filter((id) => {
      //     return id.rollno.includes(stud.urlParams);
      //   });
      //   console.log(results);
      //  var found = results.find((id)=>{
      //    return id.rollno.includes(stud.urlParams)
      //  })
      //  console.log(found);
      debugger
      let found = results.find((val) => val.rollno === stud.urlParams);
      return [200, { found }];
    }
    return [500, { message: "Internal server error" }];
  } catch (err) {
    console.error("[Mock]: ", err);
    return [500, { message: "Internal server error" }];
  }
});

// mock.onGet("/studentform/").reply((config:any) => {
//   try {
//     const { data } = config.params;

//     // if(data === students){
//     //   return students.filter(val=> {
//     //     students.includes(val)
//     //   })
//     // }
//   } catch (err) {
//     console.log(err);
//   }
//   return
// });
