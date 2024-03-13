npm install @material-ui/core @material-ui/icons


import React from 'react';
import { SvgIcon } from '@material-ui/core';
import AccessTimeFilled from '@material-ui/icons/AccessTimeFilled';
import Schedule from '@material-ui/icons/Schedule';
import Event from '@material-ui/icons/Event';

const EventIcon = () => (
  <SvgIcon viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z" />
  </SvgIcon>
);

const ScheduleIcon = () => (
  <SvgIcon viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M8 19h3v4h2v-4h3l-4-4-4 4zM4 11v2h16v-2H4z" />
  </SvgIcon>
);

const DeadlineIcon = () => (
  <SvgIcon viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M8 13h3v10h2V13h3l-4-4-4 4zM4 3v2h16V3H4z" />
  </SvgIcon>
);

export { EventIcon, ScheduleIcon, Deadline
