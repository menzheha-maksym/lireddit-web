import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';


const ChangePassword: NextPage<{ token: string }> = () => {
    const router = useRouter();
    const [, ChangePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ newPassword: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await ChangePassword({
                        newPassword: values.newPassword,
                        token: typeof router.query.token === "string" ? router.query.token : "",
                    });
                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(response.data.changePassword.errors)
                        if ('token' in errorMap) {
                            setTokenError(errorMap.token);
                        }
                        setErrors(errorMap);

                    } else if (response.data?.changePassword.user) {
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="newPassword"
                            placeholder="new password"
                            label='New Password'
                            type="password"
                        />
                        {tokenError ? (
                            <Flex>
                                <Box mr={2} color='red'>{tokenError}</Box>
                                <NextLink href='/forgot-password'>
                                    <Link>
                                       click here to get a new one
                                    </Link>
                                </NextLink>
                            </Flex>) : null}
                        <Button
                            mt={4}
                            isLoading={isSubmitting}
                            type='submit'
                            colorScheme="teal"
                        >
                            change password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper >
    );
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);