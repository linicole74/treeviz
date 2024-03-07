import React from 'react';
import ReactFlow from 'reactflow';
 
import 'reactflow/dist/style.css';
import { coursePrefixes, courses } from './course-data';

function SimplifyText(rawText: string) {
  let simplifiedText = '';
  let finishedText = rawText.split(" ");
  for (let i = 0; i < finishedText.length; i++) {
    if (finishedText[i] == 'and' || finishedText[i] == 'or') {
      simplifiedText += finishedText[i] + ' ';
    } else {
      while (finishedText[i].length != 0 && finishedText[i][0] == '(') {
        simplifiedText += '( ';
        finishedText[i] = finishedText[i].slice(1);
      }
      if (coursePrefixes.includes(finishedText[i]) && i != finishedText.length - 1 && new RegExp("[X,0,1,2,3,4,5,6,7,8,9,)]+$").test(finishedText[i + 1])) {
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

function BuildTree(course: string) {
  const text = SimplifyText(courses.get(course));
  let nodes = [];
  let pos = 0;
  let edges = [];
  let treeComponents = text.split(' ');
  let level = 0;
  let root = [];
  let components: string[][] = [[]];
  let orCount = 0;
  let andCount = 0;
  const horizontalGapSize = 160;
  const verticalGapSize = 80;
  let maxLevel = 1;
  let tempMaxLevel = 0;
  let bottommostTreeNode = '';
  let bottommostTreeNodePos = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] == '(') tempMaxLevel += 1;
    else if (text[i] == ')') tempMaxLevel -= 1;
    if (tempMaxLevel > maxLevel) maxLevel = tempMaxLevel;
  }
  for (let i = 0; i < treeComponents.length; i++) {
    if (treeComponents[i] == '(') {
      level += 1;
      root.push('');
      components.push([]);
    } else if (treeComponents[i] == 'or') {
      if (root[root.length - 1] == '') {
        root[root.length - 1] = 'or' + orCount;
        nodes.push({
          id: 'or' + orCount,
          position: {x: pos * horizontalGapSize, y: (maxLevel - level + 1) * verticalGapSize},
          style: {
            width: '0',
            height: '0',
            padding: '0'
          }
        });
        if (level == 1) {
          bottommostTreeNode = 'or' + orCount;
          bottommostTreeNodePos = pos;
        }
        pos += 1;
        orCount++;
      }
    } else if (treeComponents[i] == 'and') {
      if (root[root.length - 1] == '') {
        root[root.length - 1] = 'and' + andCount;
        nodes.push({
          id: 'and' + andCount,
          position: {x: pos * horizontalGapSize, y: (maxLevel - level + 1) * verticalGapSize},
          style: {
            width: '0',
            height: '0',
            padding: '0'
          }
        });
        if (level == 1) {
          bottommostTreeNode = 'and' + andCount;
          bottommostTreeNodePos = pos;
        }
        pos += 1;
        andCount++;
      }
    } else if (treeComponents[i].includes('_')) {
      components[components.length - 1].push(treeComponents[i].replace('_', ' '));
      nodes.push({id: treeComponents[i].replace('_', ' '), position: {x: pos * horizontalGapSize, y: (maxLevel - level) * verticalGapSize}, data: {label: treeComponents[i].replace('_', ' ')}});
      pos += 1;
    } else if (treeComponents[i] == ')') {
      if (root[root.length - 1] != '') {
        for (let i = 0; i < components[components.length - 1].length; i++) {
          let labelText = root[root.length - 1].replace(/[^a-zA-Z]+/g, '');
          edges.push({
            id: 'e' + Math.random().toString(16).slice(2),
            source: components[components.length - 1][i],
            target: root[root.length - 1],
            label: labelText == 'and' || labelText == 'or' ? labelText : ''
          });
        }
        components.pop();
        components[components.length - 1].push(root[root.length - 1]);
        root.pop();
      } else {
        // idk what goes here, seems to not explode for now
      }
      level -= 1;
    }
  }
  nodes.push({id: course, position: {x: bottommostTreeNodePos * horizontalGapSize, y: (maxLevel + 1) * verticalGapSize}, data: {label: course}});
  edges.push({id: 'e' + Math.random().toString(16).slice(2), source: bottommostTreeNode, target: nodes[nodes.length - 1].id, label: 'to take'});
  return [nodes, edges];
}

export default function Tree2(props: { course: string, setSearchCount: any }) {
  return (
    <div>
      <div style={{ width: '75vw', height: '50vh' }}>
      <ReactFlow nodes={BuildTree(props.course)[0]} edges={BuildTree(props.course)[1]} />
      </div>
    </div>
  );
}