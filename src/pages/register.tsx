import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react'
import { InputField } from '../components/inputField';
import { Wrapper } from '../components/Wrapper';


interface registerProps { }

export const Register: React.FC<registerProps> = ({ }) => {
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label='Username'
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label='Password'
                                type='password'
                            />
                        </Box>
                        <Button
                            mt={4}
                            isLoading={isSubmitting}
                            type='submit'
                            colorScheme="teal"
                        >
                            register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register