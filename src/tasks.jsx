import {useDispatch, useSelector} from "react-redux";
import {editTask, setMas} from './redux/taskSlice'
import {setDeleted} from "./redux/deletedSlice";
import History from "./history";
import {Box, Chip, Input, List, ListItem, ListItemButton} from "@mui/joy";

import {
    CancelOutlined,
    CancelRounded, EditOutlined,
    TaskAltRounded
} from "@mui/icons-material";
import s from './tasks.module.css'
import {useContext, useState} from "react";
import {ContextOpen, ContextVis} from "./App";
import Search from "./search";
import {useRef} from "react";


const Tasks = () => {

    const buttonOpen = useContext(ContextOpen)

    const dispatch = useDispatch()

    const sel = useSelector(state => state.tasks.value)

    const deleted = useSelector(state => state.deleted.deleted)

    const visibility1 = useContext(ContextVis)

    const [edit, setEdit] = useState(-1)

    const [value, setValue] = useState('')

    const e = useRef()

    const sss = sel.map((el, i) =>


        <div key={i}>


            <Box component="nav" aria-label="My site">
                <List
                    role="menubar"
                    row
                    sx={{
                        minWidth: 320,
                    }}
                >
                    <ListItem role="none">
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            href="#horizontal-list"
                            aria-label="Home"
                        >

                        </ListItemButton>
                    </ListItem>
                    {edit !== i  &&  <ListItem role="none">
                        <ListItemButton className={s.a}>
                            {el}
                        </ListItemButton>
                    </ListItem> }
                    {edit === i && <Input ref={e} value={value} onChange={(a) => {
                        setValue(a.target.value)

                    }}></Input> }
                    {edit === i && <Chip className={s.lol} onClick={() => {
                        if (value === '') {
                           setEdit(-1)
                        } else {
                            dispatch(editTask([value, i]))
                            setEdit(-1)
                            setValue('')
                        }




                    }} variant="soft" color = 'success' endDecorator={<TaskAltRounded color = 'success' variant="plain" onClick={() => {
                        if (value === '') {
                            setEdit(-1)
                        } else {
                            dispatch(editTask([value, i]))
                            setEdit(-1)
                            setValue('')
                        }

                    }}/>}>
                        Save
                        </Chip>}

                    <ListItem role="none" sx={{ marginInlineStart: 'auto' }}>
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            href="#horizontal-list"
                            aria-label="Delete"
                        >

                            <Chip onClick={() => {
                                setEdit(i)


                            }} variant="soft" color = 'warning' endDecorator={<EditOutlined color = 'warning' variant="plain" onClick={() => {
                                setEdit(i)

                            }}/>}>
                                Edit
                            </Chip>

                            <Chip onClick={() => {
                                let a = [...sel]
                                let b = sel.indexOf(el)
                                a.splice(b, 1)
                                dispatch(setMas(a))
                                dispatch(setDeleted(el))
                            }} variant="soft" color = 'danger' endDecorator={<CancelRounded color = 'danger' variant="plain" onClick={() => {
                                let a = [...sel]
                                let b = sel.indexOf(el)
                                a.splice(b, 1)
                                dispatch(setMas(a))
                                dispatch(setDeleted(el))
                            }}/>}>
                                Remove
                            </Chip>


                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>


        </div>)


    return (<div>
        <ul className={s.ul}>
            {buttonOpen && !visibility1 && sss}

        </ul>
        <History/>
        <Search/>

        <Chip variant="soft" color = 'success' startDecorator={<TaskAltRounded />}>
            {`Tasks Completed : ${deleted.length}`}
        </Chip>
        <Chip className={s.sum} variant="soft" color = 'danger' startDecorator={<CancelOutlined />}>
            {`Tasks Remained : ${sel.length}`}
        </Chip>
    </div>)
}

export default Tasks
