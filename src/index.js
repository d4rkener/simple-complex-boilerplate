#!/usr/bin/env node

import inquirer from 'inquirer';
import { mkdirSync, existsSync, readdirSync } from 'fs';
import { copySync } from 'fs-extra';
import path from 'path';

const templateDir = path.join(process.cwd() + '/src/templates');
const CHOICES = readdirSync(templateDir);

const QUESTIONS = [
  {
    name: 'projectName',
    type: 'input',
    message: 'Enter Project Name',
  },
  {
    name: 'template',
    type: 'list',
    message: 'Select a template',
    choices: CHOICES,
  },
];

const createFolder = (name) => {
  if (!existsSync(name)) {
    mkdirSync(name);
  } else {
    console.log('Sorry, The Project With This Name is Already Exists');
  }
};

const addFilesToCurrFolder = (template, name) => {
  const selectedTemplate = templateDir + `/${template}`;
  const newFolder = path.join(process.cwd() + `/${name}`);

  copySync(selectedTemplate, newFolder);
};

inquirer
  .prompt(QUESTIONS)
  .then((answers) => {
    createFolder(answers.projectName);
    addFilesToCurrFolder(answers.template, answers.projectName);
  })
  .catch((err) => console.log(err));
