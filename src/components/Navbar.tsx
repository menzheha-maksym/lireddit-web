import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';

interface NavbarProps { }


export const NavBar: React.FC<NavbarProps> = ({ }) => {
    const router = useRouter();
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    });

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
            <Flex align="center">
                <NextLink href="/create-post">
                    <Button as={Link} mr={4}>
                        create post
                    </Button>
                </NextLink>
                <Box mr={2}>{data.me.username}</Box>
                <Button
                    onClick={async () => {
                        await logout();
                        router.reload();
                    }}
                    isLoading={logoutFetching}
                    variant='link'
                >
                    logout
                </Button>
            </Flex>
        )
    }

    return (
        <Flex zIndex={1} position="sticky" top={0} bg='tan' p={4}>
            <Flex flex={1} margin="auto" maxW={800} align="center">
                <NextLink href="/">
                    <Link>
                        <Heading>LiReddit</Heading>
                    </Link>
                </NextLink>
                <Box ml={'auto'}>
                    {body}
                </Box>
            </Flex>
        </Flex>
    )
}