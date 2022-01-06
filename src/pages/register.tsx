import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react'
import { useMutation } from 'urql';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';


interface registerProps { }

export const Register: React.FC<registerProps> = ({ }) => {
    const [, register] = useRegisterMutation();
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values) => {
                    const response = await register(values);
                    response.data.register?.user?.id
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