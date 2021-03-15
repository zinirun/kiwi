import React from 'react';
import { useStyles } from '../styles/board.style';
import { InputLabel, FormControl, Select } from '@material-ui/core';

export default function SelectCategory() {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel>카테고리</InputLabel>

            <Select
                native
                //value={state.age}
                //onChange={handleChange}
            >
                <option aria-label="None" value="" />
                <option value={10}>학과 질문</option>
                <option value={20}>진로 질문</option>
                <option value={30}>학습 질문</option>
            </Select>
        </FormControl>
    );
}
