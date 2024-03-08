import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB9_gnWKRWeYmND9tRzO7j3xK9Reg8-NpQ",
    authDomain: "tree-app-1f060.firebaseapp.com",
    databaseURL: "https://tree-app-1f060-default-rtdb.firebaseio.com",
    projectId: "tree-app-1f060",
    storageBucket: "tree-app-1f060.appspot.com",
    messagingSenderId: "702893689283",
    appId: "1:702893689283:web:346fb553cb403702c21576"
  };  

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export const getPreReqs = async () => {
    const col = await getDocs(collection(firestore, "prereqs"));
    const courses:any = []
    courses.forEach((course:any) => {
        courses.push({identifier: course.identifier, prereqs: course.prerequisites})
    })
    return courses
};

const coursePrefixes = "ACCT AE AS APPH ASE ARBC ARCH BIOS BIOL BMEJ BMED BMEM BC BCP CETL CHBE CHEM CHIN CP CEE COA COE COS CX CSE CS COOP UCGA EAS ECON ECEP ECE ENGL FC FREE FREN GT GTL GRMN HS HEBW HIN HIST HTS HUM ID ISYE INTA IL INTN IMBA IAC JAPN KOR LATN LS LING LMC MGT MOT MLDR MSE MATH ME MP MSL ML MUSI NS NEUR NRE PERS PHIL PHYS POL PTFE PORT DOPP PSYC PUBJ PUBP RUSS SCI SLS SS SOC SPAN SWAH VIP WOLO".split(" ");

export function ParseCourse(rawCourse: string) {
  rawCourse = rawCourse.toUpperCase();
  return rawCourse;
}

export function GetPrereqTextForCourse(course: string) {
  let simplifiedText = '';
  let finishedText = courses.get(ParseCourse(course)).split(" ");
  for (let i = 0; i < finishedText.length; i++) {
    if (finishedText[i] == 'and' || finishedText[i] == 'or') {
      simplifiedText += finishedText[i] + ' ';
    } else {
      while (finishedText[i].length != 0 && finishedText[i][0] == '(') {
        simplifiedText += '( ';
        finishedText[i] = finishedText[i].slice(1);
      }
      if (coursePrefixes.includes(finishedText[i]) && i != finishedText.length - 1 && new RegExp("[X,0,1,2,3,4,5,6,7,8,9,)]+$").test(finishedText[i + 1]) && finishedText[i + 1].replace(')','').length == 4) {
        simplifiedText += finishedText[i] + '_' + finishedText[i + 1].replace(')','') + ' ';
        for (let j = 0; j < (finishedText[i].match(/\)/g) || []).length; j++) {
          simplifiedText += ') ';
        }
        finishedText[i + 1] = '';
      } else {
        for (let j = 0; j < (finishedText[i].match(/\)/g) || []).length; j++) {
          simplifiedText += ') ';
        }
      }
    }
  }
  return '( ' + simplifiedText + ')';
}

export function IsValidCourse(course: string) {
  return courses.has(ParseCourse(course));
}

const courses = new Map();
const prereqs = getPreReqs()
console.log(prereqs)
courses.set("PHYS 3122", "(Undergraduate Semester level PHYS 2212 Minimum Grade of D or Undergraduate Semester level PHYS 2232 Minimum Grade of D) and (Undergraduate Semester level MATH 2403 Minimum Grade of D or Undergraduate Semester level MATH 2413 Minimum Grade of D or Undergraduate Semester level MATH 24X3 Minimum Grade of D)");
courses.set("PHYS 4206", "Undergraduate Semester level PHYS 3211 Minimum Grade of D");
courses.set("PHYS 4321", "Undergraduate Semester level PHYS 3143 Minimum Grade of D");
courses.set("PHYS 2212", "Undergraduate Semester level PHYS 2211 Minimum Grade of D or Undergraduate Semester level PHYS 2231 Minimum Grade of D");
courses.set("PHYS 2232", "Undergraduate Semester level PHYS 2211 Minimum Grade of D or Undergraduate Semester level PHYS 2231 Minimum Grade of D");
courses.set("MATH 2403", "Undergraduate Semester level MATH 1502 Minimum Grade of D or Undergraduate Semester level MATH 1512 Minimum Grade of D or (Undergraduate Semester level MATH 15X2 Minimum Grade of D and Undergraduate Semester level MATH 1522 Minimum Grade of D)");
courses.set("MATH 2413", "Undergraduate Semester level MATH 2401 Minimum Grade of B or Undergraduate Semester level MATH 2411 Minimum Grade of B or Undergraduate Semester level MATH 2605 Minimum Grade of B");
courses.set("MATH 24X3", "");
courses.set("PHYS 3211", "Undergraduate Semester level PHYS 2212 Minimum Grade of D or Undergraduate Semester level PHYS 2232 Minimum Grade of D");
courses.set("PHYS 3143", "(Undergraduate Semester level PHYS 2212 Minimum Grade of D or Undergraduate Semester level PHYS 2232 Minimum Grade of D) and (Undergraduate Semester level MATH 2403 Minimum Grade of D or Undergraduate Semester level MATH 2413 Minimum Grade of D or Undergraduate Semester level MATH 24X3 Minimum Grade of T or Undergraduate Semester level MATH 2552 Minimum Grade of D or Undergraduate Semester level MATH 2562 Minimum Grade of D or Undergraduate Semester level MATH 2X52 Minimum Grade of T)");
courses.set("PHYS 2211", "Undergraduate Semester level MATH 1502 Minimum Grade of D or Undergraduate Semester level MATH 1512 Minimum Grade of D");
courses.set("PHYS 2231", "Undergraduate Semester level MATH 1502 Minimum Grade of D or Undergraduate Semester level MATH 1512 Minimum Grade of D");
courses.set("MATH 1502", "Undergraduate Semester level MATH 1501 Minimum Grade of D or Undergraduate Semester level MATH 1511 Minimum Grade of D or Undergraduate Semester level MATH 15X1 Minimum Grade of D");
courses.set("MATH 1512", "Undergraduate Semester level MATH 1501 Minimum Grade of B or Undergraduate Semester level MATH 1511 Minimum Grade of B");
courses.set("MATH 1501", "Undergraduate Semester level MATH 1113 Minimum Grade of D or SAT Mathematics 600 or Converted ACT Math 600");
courses.set("MATH 1511", "SAT Mathematics 700 or Converted ACT Math 700 or Undergraduate Semester level MATH 1501 Minimum Grade of D");
courses.set("MATH 15X1", "");
courses.set("MATH 1113", "");
courses.set("MATH 15X2", "");
courses.set("MATH 1522", "Undergraduate Semester level MATH 15X2 Minimum Grade of D");
courses.set("MATH 2401", "Undergraduate Semester level MATH 1502 Minimum Grade of D or Undergraduate Semester level MATH 1512 Minimum Grade of D or (Undergraduate Semester level MATH 15X2 Minimum Grade of D and Undergraduate Semester level MATH 1522 Minimum Grade of D)");
courses.set("MATH 2411", "Undergraduate Semester level MATH 1502 Minimum Grade of B or Undergraduate Semester level MATH 1512 Minimum Grade of B");
courses.set("MATH 2605", "Undergraduate Semester level MATH 1502 Minimum Grade of D or Undergraduate Semester level MATH 1512 Minimum Grade of D or (Undergraduate Semester level MATH 15X2 Minimum Grade of D and Undergraduate Semester level MATH 1522 Minimum Grade of D)");
courses.set("MATH 2552", "Undergraduate Semester level MATH 1502 Minimum Grade of D or Undergraduate Semester level MATH 1512 Minimum Grade of D or Undergraduate Semester level MATH 1504 Minimum Grade of D or Undergraduate Semester level MATH 1555 Minimum Grade of D or ( (Undergraduate Semester level MATH 1552 Minimum Grade of D or Undergraduate Semester level MATH 15X2 Minimum Grade of T or Undergraduate Semester level MATH 1X52 Minimum Grade of T) and (Undergraduate Semester level MATH 1553 Minimum Grade of D or Undergraduate Semester level MATH 1X54 Minimum Grade of T or Undergraduate Semester level MATH 1554 Minimum Grade of D or Undergraduate Semester level MATH 1564 Minimum Grade of D or Undergraduate Semester level MATH 1522 Minimum Grade of D or Undergraduate Semester level MATH 1X53 Minimum Grade of T) )");
courses.set("MATH 2562", "Undergraduate Semester level MATH 1502 Minimum Grade of B or Undergraduate Semester level MATH 1512 Minimum Grade of B or Undergraduate Semester level MATH 1504 Minimum Grade of B or Undergraduate Semester level MATH 1555 Minimum Grade of B or ( (Undergraduate Semester level MATH 1552 Minimum Grade of B or Undergraduate Semester level MATH 15X2 Minimum Grade of T or Undergraduate Semester level MATH 1X52 Minimum Grade of T) and (Undergraduate Semester level MATH 1553 Minimum Grade of B or Undergraduate Semester level MATH 1X54 Minimum Grade of T or Undergraduate Semester level MATH 1554 Minimum Grade of B or Undergraduate Semester level MATH 1564 Minimum Grade of B or Undergraduate Semester level MATH 1522 Minimum Grade of B or Undergraduate Semester level MATH 1X53 Minimum Grade of T) )");
courses.set("MATH 2X52", "");
courses.set("MATH 1504", "Undergraduate Semester level MATH 1503 Minimum Grade of D or Undergraduate Semester level MATH 1501 Minimum Grade of D or Undergraduate Semester level MATH 1511 Minimum Grade of D or Undergraduate Semester level MATH 15X1 Minimum Grade of T or SAT Mathematics 600 or Converted ACT Math 600");
courses.set("MATH 1555", "Undergraduate Semester level MATH 1550 Minimum Grade of D or Undergraduate Semester level MATH 1551 Minimum Grade of D or Undergraduate Semester level MATH 1501 Minimum Grade of D or Undergraduate Semester level MATH 1X51 Minimum Grade of T or Undergraduate Semester level MATH 15X1 Minimum Grade of T or Undergraduate Semester level MATH 1X54 Minimum Grade of T");
courses.set("MATH 1552", "Undergraduate Semester level MATH 1550 Minimum Grade of D or Undergraduate Semester level MATH 1551 Minimum Grade of D or Undergraduate Semester level MATH 1501 Minimum Grade of D or Undergraduate Semester level MATH 15X1 Minimum Grade of T or Undergraduate Semester level MATH 1X51 Minimum Grade of T");
courses.set("MATH 1X52", "");
courses.set("MATH 1550", "(Undergraduate Semester level MATH 1113 Minimum Grade of D or Undergraduate Semester level MATH 11X3 Minimum Grade of T) or SAT Mathematics 600 or MATH SECTION SCORE 620 or ACT Math 26");
courses.set("MATH 1551", "(Undergraduate Semester level MATH 1113 Minimum Grade of D or Undergraduate Semester level MATH 11X3 Minimum Grade of T) or SAT Mathematics 600 or MATH SECTION SCORE 620 or Converted ACT Math 600 or ACT Math 26");
courses.set("MATH 1X51", "");
courses.set("MATH 1X54", "");
courses.set("MATH 11X3", "");
courses.set("MATH 1553", "(Undergraduate Semester level MATH 1113 Minimum Grade of D or Undergraduate Semester level MATH 11X3 Minimum Grade of T) or SAT Mathematics 600 or MATH SECTION SCORE 620 or Converted ACT Math 600 or ACT Math 26 or Undergraduate Semester level MATH 15X1 Minimum Grade of T or Undergraduate Semester level MATH 1X51 Minimum Grade of T or Undergraduate Semester level MATH 1551 Minimum Grade of D");
courses.set("MATH 1554", "(Undergraduate Semester level MATH 1113 Minimum Grade of D or Undergraduate Semester level MATH 11X3 Minimum Grade of T) or ACT Math 26 or SAT Mathematics 600 or MATH SECTION SCORE 620 or Converted ACT Math 600 or Undergraduate Semester level MATH 1552 Minimum Grade of D or Undergraduate Semester level MATH 15X2 Minimum Grade of D or Undergraduate Semester level MATH 1X52 Minimum Grade of D or Undergraduate Semester level MATH 1551 Minimum Grade of D");
courses.set("MATH 1564", "Math: Calculus AB 5 or Math: Calculus BC 5 or Undergraduate Semester level MATH 1552 Minimum Grade of A");
courses.set("MATH 1522", "Undergraduate Semester level MATH 15X2 Minimum Grade of D");
courses.set("MATH 1X53", "");
courses.set("BMED 3610", "Undergraduate Semester level BMED 2310 Minimum Grade of D and (Undergraduate Semester level BMED 2400 Minimum Grade of D or Undergraduate Semester level ISYE 3770 Minimum Grade of D or Undergraduate Semester level CEE 3770 Minimum Grade of D) and Undergraduate Semester level BMED 3600 Minimum Grade of D");
courses.set("BMED 3520", "Undergraduate Semester level BMED 3100 Minimum Grade of D and (Undergraduate Semester level BMED 2210 Minimum Grade of D or Undergraduate Semester level BMED 2110 Minimum Grade of D) and (Undergraduate Semester level MATH 2403 Minimum Grade of D or Undergraduate Semester level MATH 2413 Minimum Grade of D or Undergraduate Semester level MATH 24X3 Minimum Grade of T or Undergraduate Semester level MATH 2552 Minimum Grade of D or Undergraduate Semester level MATH 2562 Minimum Grade of D or Undergraduate Semester level MATH 2X52 Minimum Grade of T) and Undergraduate Semester level CS 1371 Minimum Grade of D");
courses.set("BMED 3600", "Undergraduate Semester level BMED 3100 Minimum Grade of D");
courses.set("BMED 2310", "(Undergraduate Semester level BMED 2210 Minimum Grade of D or Undergraduate Semester level BMED 2110 Minimum Grade of D) and Undergraduate Semester level BMED 2250 Minimum Grade of D and (Undergraduate Semester level PHYS 2211 Minimum Grade of D or Undergraduate Semester level PHYS 2231 Minimum Grade of D)");
courses.set("BMED 2400", "(Undergraduate Semester level MATH 1501 Minimum Grade of D or Undergraduate Semester level MATH 1511 Minimum Grade of D or Undergraduate Semester level MATH 1552 Minimum Grade of D) and Undergraduate Semester level CS 1371 Minimum Grade of D");
courses.set("ISYE 3770", "Undergraduate Semester level MATH 2550 Minimum Grade of D or Undergraduate Semester level MATH 2551 Minimum Grade of D or (Undergraduate Semester level MATH 2X51 Minimum Grade of T and (Undergraduate Semester level MATH 1522 Minimum Grade of D or Undergraduate Semester level MATH 1553 Minimum Grade of D or Undergraduate Semester level MATH 1554 Minimum Grade of D or Undergraduate Semester level MATH 1564 Minimum Grade of D or Undergraduate Semester level MATH 1X53 Minimum Grade of T or Undergraduate Semester level MATH 1X54 Minimum Grade of T) )");
courses.set("CEE 3770", "Undergraduate Semester level MATH 2401 Minimum Grade of D or Undergraduate Semester level MATH 2411 Minimum Grade of D or Undergraduate Semester level MATH 24X1 Minimum Grade of T or Undergraduate Semester level MATH 2551 Minimum Grade of D or Undergraduate Semester level MATH 2561 Minimum Grade of D or Undergraduate Semester level MATH 2X51 Minimum Grade of T");
courses.set("BMED 2210", "(Undergraduate Semester level MATH 1501 Minimum Grade of D or Undergraduate Semester level MATH 1511 Minimum Grade of D or Undergraduate Semester level MATH 1X52 Minimum Grade of T or Undergraduate Semester level MATH 1552 Minimum Grade of D) and (Undergraduate Semester level CHEM 1211K Minimum Grade of D or Undergraduate Semester level CHEM 1310 Minimum Grade of D)");
courses.set("BMED 2110", "(Undergraduate Semester level CHEM 1211K Minimum Grade of D or Undergraduate Semester level CHEM 1310 Minimum Grade of D) and (Undergraduate Semester level MATH 1552 Minimum Grade of D or Undergraduate Semester level MATH 15X2 Minimum Grade of T) and Undergraduate Semester level BMED 1000 Minimum Grade of D");
courses.set("BMED 2250", "Undergraduate Semester level BMED 2210 Minimum Grade of D or Undergraduate Semester level BMED 2110 Minimum Grade of D");
courses.set("CHEM 1310", "");
courses.set("BMED 1000", "");
courses.set("CS 1371", "");
courses.set("MATH 24X1", "");
courses.set("MATH 2551", "Undergraduate Semester level MATH 1502 Minimum Grade of D or Undergraduate Semester level MATH 1512 Minimum Grade of D or Undergraduate Semester level MATH 1504 Minimum Grade of D or Undergraduate Semester level MATH 1555 Minimum Grade of D or ( (Undergraduate Semester level MATH 1552 Minimum Grade of D or Undergraduate Semester level MATH 15X2 Minimum Grade of T or Undergraduate Semester level MATH 1X52 Minimum Grade of T) and (Undergraduate Semester level MATH 1553 Minimum Grade of D or Undergraduate Semester level MATH 1X54 Minimum Grade of T or Undergraduate Semester level MATH 1554 Minimum Grade of D or Undergraduate Semester level MATH 1564 Minimum Grade of D or Undergraduate Semester level MATH 1522 Minimum Grade of D or Undergraduate Semester level MATH 1X53 Minimum Grade of T) )");
courses.set("MATH 2561", "Undergraduate Semester level MATH 1502 Minimum Grade of B or Undergraduate Semester level MATH 1512 Minimum Grade of B or Undergraduate Semester level MATH 1504 Minimum Grade of B or Undergraduate Semester level MATH 1555 Minimum Grade of B or ( (Undergraduate Semester level MATH 1552 Minimum Grade of B or Undergraduate Semester level MATH 15X2 Minimum Grade of T or Undergraduate Semester level MATH 1X52 Minimum Grade of T) and (Undergraduate Semester level MATH 1553 Minimum Grade of B or Undergraduate Semester level MATH 1X54 Minimum Grade of T or Undergraduate Semester level MATH 1554 Minimum Grade of B or Undergraduate Semester level MATH 1564 Minimum Grade of B or Undergraduate Semester level MATH 1522 Minimum Grade of B or Undergraduate Semester level MATH 1X53 Minimum Grade of T) )");
courses.set("MATH 2X51", "");
courses.set("BMED 3100", "Undergraduate Semester level CHEM 1315 Minimum Grade of C or Undergraduate Semester level CHEM 2311 Minimum Grade of D");
courses.set("CHEM 1315", "Undergraduate Semester level CHEM 1211K Minimum Grade of D or Undergraduate Semester level CHEM 1310 Minimum Grade of D");
courses.set("CHEM 1211K", "");
courses.set("CHEM 1212K", "Undergraduate Semester level CHEM 1211K Minimum Grade of D or Undergraduate Semester level CHEM 1310 Minimum Grade of D");
courses.set("CHEM 2311", "Undergraduate Semester level CHEM 1311 Minimum Grade of D or Undergraduate Semester level CHEM 1212K Minimum Grade of D");
courses.set("CHEM 1311", "Undergraduate Semester level CHEM 1310 Minimum Grade of D");
courses.set("CS 1301", "");
courses.set("CS 1331", "Undergraduate Semester level CS 1301 Minimum Grade of C or Undergraduate Semester level CS 1315 Minimum Grade of C or Undergraduate Semester level CS 1321 Minimum Grade of C or Undergraduate Semester level CS 1371 Minimum Grade of C");

/*
TODO: course numbers with letters like 1211K will mess it up
*/