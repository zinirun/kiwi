import React from 'react';
import { useStyles } from '../styles/board.style';
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';

export default function SelectCategory() {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel>카테고리</InputLabel>

            <Select
            //value={state.age}
            //onChange={handleChange}
            >
                <MenuItem>전체</MenuItem>
                <MenuItem value={10}>학과 질문</MenuItem>
                <MenuItem value={20}>진로 질문</MenuItem>
                <MenuItem value={30}>학습 질문</MenuItem>
            </Select>
        </FormControl>
    );
}
