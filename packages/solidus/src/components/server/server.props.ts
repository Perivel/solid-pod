/**
 * Server Props
 */

export interface TagDetails {
    tag: string;
    props: Record<string, unknown>;
}

export default interface ServerProps {
    tags: TagDetails[];
}