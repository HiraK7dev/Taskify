import React, { useState } from 'react'
import { Card, CardBody, Checkbox, Input } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import axios from 'axios';

function ViewPanel({ todo, getTodo }) {

    const [editable, setEditable] = useState({ id: null, task: null });
    const [isCompleted, setisCompleted] = useState(false);

    function handleOnChange(event) {
        setEditable({
            ...editable,
            task: event.target.value
        })
    }

    async function deleteTodo(id) {
        try {
            const result = await axios.delete(`/todos/${id}`);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        getTodo();
    }

    async function editTodo(id) {
        try {
            const result = await axios.patch(`/todos/${id}`, {
                "task": `${editable.task}`,
                "isCompleted": `${isCompleted}`
            })
        } catch (error) {
            console.log(`Error: ${error}`);
        }
        setEditable({ id: null, task: null, isCompleted: null });
        getTodo();
    }

    return (
        <div className='sm:w-2/5 w-80 flex flex-col justify-start items-center mt-5'>
            {
                todo?.data?.map((val) => {
                    return (
                        <Card key={val._id} className='mt-3 w-full'>
                            <CardBody>
                                {
                                    editable.id == val._id ?
                                        <div className='flex'><Checkbox isSelected={isCompleted} onValueChange={() => setisCompleted(!isCompleted)} color='danger'/><Input value={editable.task} onChange={handleOnChange} type="text" color='danger' /></div> :
                                        <p className='p-1'>{ val.isCompleted ? <s>{val.task}</s> : val.task}</p>
                                }
                                <div className='w-full h-14 my-2 flex justify-end items-center'>
                                    <ButtonGroup>
                                        {
                                            editable.id == val._id ?
                                                <Button onClick={() => editTodo(val._id)}>Save</Button> :
                                                <Button onClick={() => {setEditable({ id: val._id, task: val.task }); setisCompleted(val.isCompleted)}}>Edit</Button>
                                        }
                                        <Button onClick={() => deleteTodo(val._id)}>Delete</Button>
                                    </ButtonGroup>
                                </div>
                            </CardBody>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default ViewPanel