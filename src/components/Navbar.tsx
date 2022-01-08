import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from '../generated/graphql';

interface NavbarProps { }


export const NavBar: React.FC<NavbarProps> = ({ }) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery();
    let body = null;

    if (fetching) {

    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link >register</Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Box>
                <Flex>
                    <Box mr={2}>{data.me.username}</Box>
                    <Button
                        onClick={() => { logout(); }}
                        isLoading={logoutFetching}
                        variant='link'
                    >
                        logout
                    </Button>
                </Flex>
            </Box>

        )
    }

    return (
        <Flex bg='tan' p={4} >
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    )
}