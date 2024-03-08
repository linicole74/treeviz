import React, { useEffect } from 'react';
import ReactFlow from 'reactflow';
 
import 'reactflow/dist/style.css';
import { GetPrereqTextForCourse, ParseCourse, getPreReqs} from './course-data';

function BuildTree(course: string) {
  course = ParseCourse(course);
  const text = GetPrereqTextForCourse(course);
  let nodes = [];
  let edges: any[] = [];
  let pos = 0;
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
          data: {label: 'or'},
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
        nodes.push({id: 'and' + andCount, position: {x: pos * horizontalGapSize, y: (maxLevel - level + 1) * verticalGapSize}, data: {label: 'and'}});
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
          edges.push({id: 'e' + Math.random().toString(16).slice(2), source: components[components.length - 1][i], target: root[root.length - 1]});
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
  nodes.push({id: course, position: {x: bottommostTreeNodePos * horizontalGapSize, y: (maxLevel + 1) * verticalGapSize}, data: {label: (nodes.length ? "" : "no prerequisites ") + "to take " + course}});
  if (nodes.length == 2) {
    edges.push({id: 'e' + Math.random().toString(16).slice(2), source: nodes[0].id, target: nodes[1].id});
  } else {
    edges.push({id: 'e' + Math.random().toString(16).slice(2), source: bottommostTreeNode, target: nodes[nodes.length - 1].id});
  }

  return [nodes, edges];
}

export default function Tree1(props: { course: string, setSearchCount: any }) {
  return (
    <div>
      <div style={{ width: '75vw', height: '50vh' }}>
        <ReactFlow
          nodes={BuildTree(props.course)[0]}
          edges={BuildTree(props.course)[1]}
        />
      </div>
    </div>
  );
}