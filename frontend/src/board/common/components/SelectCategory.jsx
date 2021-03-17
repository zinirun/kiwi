import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useStyles } from '../styles/board.style';
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';
import { GET_CATEGORIES } from '../../../configs/queries';

export default function SelectCategory({ boardId }) {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const { data: categoriesData, error: categoriesError } = useQuery(GET_CATEGORIES, {
        variables: {
            boardId: boardId,
        },
    });
    useEffect(() => {
        if (categoriesData) {
            console.log(categoriesData.getCategoriesByBoardId);
            setCategories(categoriesData.getCategoriesByBoardId);
        }
    }, [categoriesData, setCategories]);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>카테고리</InputLabel>
            <Select
                defaultValue=""
                //onChange={handleChange}
            >
                <MenuItem value="">전체</MenuItem>
                {categories.map((c, idx) => (
                    <MenuItem value={c.categoryId} key={idx}>
                        {c.categoryName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
