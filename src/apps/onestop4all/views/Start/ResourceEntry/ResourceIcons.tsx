import { color } from "framer-motion";
import { ResourceType } from "../../../services/ResourceTypeUtils";

export interface ResourceIconProps {
    type: ResourceType;
    size: number;
    offsetX?: number;
    offsetY?: number;
    color?: string;
}

export const ResourceIcon = (props: ResourceIconProps) => {
    let { color } = props;
    if (!color) {
        color = "white";
    }
    const offsetX = props.offsetX !== undefined ? props.offsetX : 0;
    const offsetY = props.offsetY !== undefined ? props.offsetY : 0;
    switch (props.type) {
        case ResourceType.Repos:
            return (
                <svg
                    width={props.size}
                    height={props.size}
                    x={offsetX}
                    y={offsetY}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 7C2.73478 7 2.48043 7.10536 2.29289 7.29289C2.10536 7.48043 2 7.73478 2 8V14C2 14.2652 2.10536 14.5196 2.29289 14.7071C2.48043 14.8946 2.73478 15 3 15H45C45.2652 15 45.5196 14.8946 45.7071 14.7071C45.8946 14.5196 46 14.2652 46 14V8C46 7.73478 45.8946 7.48043 45.7071 7.29289C45.5196 7.10536 45.2652 7 45 7H3ZM0.87868 5.87868C1.44129 5.31607 2.20435 5 3 5H45C45.7956 5 46.5587 5.31607 47.1213 5.87868C47.6839 6.44129 48 7.20435 48 8V14C48 14.7956 47.6839 15.5587 47.1213 16.1213C46.5587 16.6839 45.7957 17 45 17H3C2.20435 17 1.44129 16.6839 0.87868 16.1213C0.316071 15.5587 0 14.7956 0 14V8C0 7.20435 0.316071 6.44129 0.87868 5.87868Z"
                        fill={color}
                    />
                    <path
                        d="M3 19C3.55228 19 4 19.4477 4 20V40C4 40.2652 4.10536 40.5196 4.29289 40.7071C4.48043 40.8946 4.73478 41 5 41H43C43.2652 41 43.5196 40.8946 43.7071 40.7071C43.8946 40.5196 44 40.2652 44 40V20C44 19.4477 44.4477 19 45 19C45.5523 19 46 19.4477 46 20V40C46 40.7956 45.6839 41.5587 45.1213 42.1213C44.5587 42.6839 43.7956 43 43 43H5C4.20435 43 3.44129 42.6839 2.87868 42.1213C2.31607 41.5587 2 40.7956 2 40V20C2 19.4477 2.44772 19 3 19Z"
                        fill={color}
                    />
                    <path
                        d="M20 23C19.4696 23 18.9609 23.2107 18.5858 23.5858C18.2107 23.9609 18 24.4696 18 25C18 25.5304 18.2107 26.0391 18.5858 26.4142C18.9609 26.7893 19.4696 27 20 27H28C28.5304 27 29.0391 26.7893 29.4142 26.4142C29.7893 26.0391 30 25.5304 30 25C30 24.4696 29.7893 23.9609 29.4142 23.5858C29.0391 23.2107 28.5304 23 28 23H20ZM17.1716 22.1716C17.9217 21.4214 18.9391 21 20 21H28C29.0609 21 30.0783 21.4214 30.8284 22.1716C31.5786 22.9217 32 23.9391 32 25C32 26.0609 31.5786 27.0783 30.8284 27.8284C30.0783 28.5786 29.0609 29 28 29H20C18.9391 29 17.9217 28.5786 17.1716 27.8284C16.4214 27.0783 16 26.0609 16 25C16 23.9391 16.4214 22.9217 17.1716 22.1716Z"
                        fill={color}
                    />
                </svg>
            );
        // case ResourceType.Services:
        //     return (
        //         <svg
        //             fill="none"
        //             width={props.size}
        //             height={props.size}
        //             x={offsetX}
        //             y={offsetY}
        //             viewBox="0 0 48 48"
        //             xmlns="http://www.w3.org/2000/svg"
        //         >
        //             <path
        //                 className="path"
        //                 clipRule="evenodd"
        //                 d="M0.000411987 16.3403C0.000411987 7.40613 7.36726 0 16.2729 0C23.7943 0 29.9758 4.97713 31.9745 11.8566C33.5247 11.0285 35.2765 10.6211 37.0146 10.6211C43.0733 10.6211 48 15.5763 48 21.6509C48 24.5741 46.8778 27.2849 44.8556 29.316C44.4577 29.7158 43.811 29.7172 43.4113 29.3193C43.0116 28.9213 43.0102 28.2747 43.4081 27.875C45.0462 26.2296 45.9575 24.0382 45.9575 21.6509C45.9575 16.6958 41.9367 12.6637 37.0146 12.6637C35.1798 12.6637 33.3674 13.2176 31.9354 14.2964C31.6548 14.5078 31.2852 14.5602 30.957 14.435C30.6287 14.3098 30.3879 14.0247 30.3193 13.6802C28.9869 6.98876 23.2892 2.04254 16.2729 2.04254C8.50386 2.04254 2.04295 8.52564 2.04295 16.3403C2.04295 20.3499 3.55585 23.7701 6.21911 26.4452C6.61705 26.8449 6.61562 27.4915 6.21591 27.8895C5.81619 28.2874 5.16956 28.286 4.77162 27.8863C1.7411 24.8423 0.000411987 20.9093 0.000411987 16.3403ZM23.4589 14.0451C23.7901 13.8381 24.2103 13.8381 24.5415 14.0451L32.7116 19.1514C33.0102 19.3381 33.1916 19.6653 33.1916 20.0175V27.5748C33.1916 27.5908 33.1912 27.6067 33.1905 27.6226L39.8629 31.8163C40.1602 32.0032 40.3407 32.3298 40.3407 32.681V41.4639C40.3407 41.7901 40.1849 42.0966 39.9214 42.2889L32.3638 47.8037C32.0199 48.0547 31.5563 48.0659 31.2005 47.8319L24.008 43.1L17.0145 47.825C16.6618 48.0633 16.1983 48.0578 15.8513 47.8112L8.08966 42.2964C7.82007 42.1048 7.65992 41.7946 7.65992 41.4639V32.681C7.65992 32.3298 7.84037 32.0032 8.13772 31.8163L14.8099 27.6226C14.8092 27.6067 14.8088 27.5908 14.8088 27.5748V20.0175C14.8088 19.6653 14.9902 19.3381 15.2888 19.1514L23.4589 14.0451ZM16.2609 29.1231L10.4937 32.748L16.4683 37.1503L22.198 33.279L16.2609 29.1231ZM22.979 35.2165L17.4641 38.9426V45.0562L22.9791 41.3301L22.979 35.2165ZM25.0217 41.322L30.7406 45.0844V38.9507L25.0215 35.1883L25.0217 41.322ZM25.8185 33.2677L31.7206 37.1505L37.5241 32.7588L31.7395 29.1231L25.8185 33.2677ZM31.1491 27.0431V21.8601L25.0215 25.6898V31.3324L31.1491 27.0431ZM22.9789 31.3324V25.6898L16.8513 21.8601V27.0431L22.9789 31.3324ZM17.757 20.0175L24.0002 23.9195L30.2434 20.0175L24.0002 16.1154L17.757 20.0175ZM38.2982 34.7345L32.7831 38.908V44.9692L38.2982 40.9449V34.7345ZM15.4215 45.0003V38.9161L9.70246 34.7021V40.9367L15.4215 45.0003Z"
        //                 fill={color}
        //                 fillRule="evenodd"
        //             />
        //         </svg>
        //     );
        case ResourceType.Tools:
            return (
                <svg
                    width={props.size}
                    height={props.size}
                    x={offsetX}
                    y={offsetY}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19.2627 34.3924L6.82665 46.8284C6.82065 46.8344 6.81465 46.8404 6.80665 46.8464C6.05065 47.5624 5.04465 47.9564 4.00265 47.9424C2.96265 47.9264 1.96666 47.5064 1.23066 46.7704C0.492656 46.0344 0.0726558 45.0404 0.0586558 43.9984C0.0426558 42.9564 0.434656 41.9504 1.15066 41.1944C1.15666 41.1864 1.16466 41.1804 1.17066 41.1744L13.6067 28.7344L12.1947 27.3204C11.8047 26.9304 11.8047 26.2964 12.1947 25.9064C12.5847 25.5164 13.2187 25.5164 13.6087 25.9064L15.7287 28.0264L17.1427 29.4444L38.4046 8.20438L38.2246 8.02238C37.9126 7.71238 37.6726 7.33838 37.5226 6.92638C37.3726 6.51238 37.3146 6.07238 37.3546 5.63438C37.3926 5.19838 37.5266 4.77438 37.7466 4.39438C37.9666 4.01438 38.2686 3.68638 38.6286 3.43638L43.0606 0.358381C43.4466 0.0903812 43.9126 -0.0336188 44.3806 0.0083812C44.8486 0.0503812 45.2846 0.254381 45.6166 0.586381L47.4186 2.38638C47.7586 2.72838 47.9646 3.18038 47.9966 3.66238C48.0306 4.14238 47.8886 4.61838 47.6006 5.00038L44.3706 9.31838C44.1126 9.66238 43.7846 9.94638 43.4086 10.1544C43.0306 10.3604 42.6126 10.4824 42.1846 10.5144C41.7546 10.5444 41.3246 10.4844 40.9206 10.3344C40.5166 10.1844 40.1506 9.94838 39.8466 9.64438L39.8186 9.61638L18.5567 30.8584L19.9687 32.2724L22.0887 34.3924C22.4787 34.7824 22.4787 35.4164 22.0887 35.8064C21.6987 36.1964 21.0647 36.1964 20.6747 35.8064L19.2627 34.3924ZM15.0207 30.1484C15.0207 30.1484 2.59866 42.5744 2.58866 42.5864C2.24066 42.9624 2.05066 43.4584 2.05866 43.9704C2.06466 44.4904 2.27666 44.9884 2.64466 45.3564C3.01266 45.7244 3.51066 45.9344 4.03065 45.9424C4.54865 45.9484 5.04865 45.7544 5.42465 45.4004L17.8487 32.9784L16.4367 31.5644C15.8467 30.9744 15.2567 30.3844 15.0207 30.1484ZM40.5266 7.49638L41.2606 8.23038C41.3626 8.33038 41.4846 8.40838 41.6186 8.45838C41.7526 8.50838 41.8966 8.53038 42.0386 8.52038C42.1826 8.50838 42.3226 8.46838 42.4466 8.39838C42.5726 8.33038 42.6826 8.23438 42.7686 8.12038L45.9986 3.80238L46.0026 3.79838L44.2026 2.00038L39.7706 5.07838C39.6506 5.16238 39.5506 5.27038 39.4766 5.39638C39.4026 5.52438 39.3586 5.66438 39.3466 5.81038C39.3326 5.95638 39.3526 6.10438 39.4026 6.24038C39.4526 6.37838 39.5326 6.50438 39.6366 6.60638L40.5266 7.49638ZM23.8787 18.4664C24.2687 18.8564 24.2687 19.4904 23.8787 19.8804C23.4887 20.2704 22.8547 20.2704 22.4647 19.8804L15.5847 13.0004C15.2907 12.7064 15.2087 12.2604 15.3807 11.8824C15.8627 10.8144 16.0687 9.64638 15.9807 8.47838C15.8947 7.31238 15.5147 6.18638 14.8807 5.20438C14.2467 4.22038 13.3767 3.41238 12.3487 2.85438C11.3207 2.29438 10.1687 2.00038 9.00065 2.00038C8.51465 2.00038 8.03265 2.05038 7.56065 2.14838L10.4167 5.00238C10.7907 5.37838 11.0007 5.88438 11.0007 6.41438V9.00038C11.0007 9.53238 10.7887 10.0404 10.4147 10.4144C10.0387 10.7904 9.53065 11.0004 9.00065 11.0004H6.41265C5.88465 11.0004 5.37665 10.7904 5.00265 10.4164L2.14666 7.56038C2.04866 8.03438 2.00066 8.51638 2.00066 9.00038C2.00066 10.1704 2.29266 11.3224 2.85266 12.3504C3.41266 13.3764 4.22065 14.2484 5.20265 14.8824C6.18465 15.5164 7.31065 15.8944 8.47865 15.9824C9.64465 16.0704 10.8147 15.8624 11.8807 15.3824C12.2587 15.2104 12.7047 15.2924 12.9987 15.5864L19.8787 22.4664C20.2687 22.8564 20.2687 23.4904 19.8787 23.8804C19.4887 24.2704 18.8547 24.2704 18.4647 23.8804L12.0527 17.4684C10.8647 17.8964 9.59465 18.0704 8.32865 17.9764C6.82865 17.8644 5.38065 17.3784 4.11665 16.5624C2.85466 15.7464 1.81466 14.6264 1.09666 13.3064C0.376656 11.9844 0.00065582 10.5044 0.00065582 9.00038C-0.00134418 8.38038 0.0626558 7.76038 0.188656 7.15238C0.262656 6.80038 0.430656 6.47238 0.674656 6.20838C0.918656 5.94238 1.23066 5.74838 1.57666 5.64438C1.92066 5.54238 2.28866 5.53438 2.63866 5.62238C2.98666 5.71238 3.30666 5.89238 3.56065 6.14838L6.41465 9.00038H9.00065V6.41438L6.14665 3.56238C5.89265 3.30638 5.71065 2.98838 5.62265 2.63838C5.53265 2.28838 5.54065 1.92238 5.64465 1.57638C5.74665 1.23238 5.94065 0.920381 6.20665 0.676381C6.47265 0.432381 6.79865 0.264381 7.15265 0.190381C7.75865 0.0643812 8.37865 0.0003812 9.00065 0.0003812C10.5047 0.0003812 11.9847 0.378381 13.3047 1.09638C14.6267 1.81638 15.7447 2.85438 16.5607 4.11838C17.3767 5.38238 17.8627 6.83038 17.9747 8.33038C18.0707 9.59638 17.8967 10.8644 17.4667 12.0544L23.8787 18.4664ZM28.1207 25.5364C27.7307 25.1464 27.7307 24.5124 28.1207 24.1224C28.5107 23.7324 29.1446 23.7324 29.5346 24.1224L35.9466 30.5344C37.1366 30.1044 38.4046 29.9304 39.6706 30.0244C41.1706 30.1384 42.6186 30.6244 43.8826 31.4404C45.1466 32.2564 46.1846 33.3744 46.9046 34.6964C47.6226 36.0164 48.0006 37.4964 48.0006 39.0004C48.0006 39.6204 47.9366 40.2404 47.8106 40.8484C47.7366 41.2024 47.5686 41.5284 47.3246 41.7944C47.0806 42.0584 46.7686 42.2544 46.4246 42.3564C46.0786 42.4604 45.7106 42.4664 45.3626 42.3784C45.0126 42.2904 44.6926 42.1084 44.4386 41.8544L41.5846 39.0004H39.0006L38.9986 41.5864L41.8526 44.4404C42.1086 44.6944 42.2886 45.0144 42.3786 45.3624C42.4666 45.7124 42.4586 46.0804 42.3566 46.4244C42.2526 46.7704 42.0586 47.0804 41.7926 47.3264C41.5286 47.5704 41.2006 47.7384 40.8466 47.8124C40.2406 47.9384 39.6206 48.0004 39.0006 48.0004C37.4966 48.0004 36.0166 47.6244 34.6946 46.9044C33.3746 46.1864 32.2546 45.1464 31.4386 43.8824C30.6226 42.6204 30.1366 41.1724 30.0246 39.6724C29.9286 38.4064 30.1046 37.1364 30.5326 35.9484L24.1207 29.5364C23.7307 29.1464 23.7307 28.5124 24.1207 28.1224C24.5107 27.7324 25.1447 27.7324 25.5347 28.1224L32.4146 35.0024C32.7086 35.2964 32.7906 35.7404 32.6186 36.1204C32.1386 37.1864 31.9307 38.3564 32.0187 39.5224C32.1067 40.6904 32.4846 41.8164 33.1186 42.7984C33.7526 43.7804 34.6246 44.5884 35.6506 45.1484C36.6786 45.7084 37.8306 46.0004 39.0006 46.0004C39.4846 46.0004 39.9666 45.9524 40.4386 45.8544L37.5846 42.9984C37.2106 42.6244 37.0006 42.1164 37.0006 41.5864V39.0004C37.0006 38.4704 37.2106 37.9624 37.5846 37.5864C37.9606 37.2124 38.4686 37.0004 39.0006 37.0004H41.5866C42.1166 37.0004 42.6226 37.2104 42.9986 37.5844L45.8526 40.4404C45.9506 39.9664 46.0006 39.4844 46.0006 39.0004C46.0006 37.8304 45.7066 36.6804 45.1466 35.6524C44.5886 34.6244 43.7806 33.7544 42.7966 33.1204C41.8146 32.4844 40.6886 32.1064 39.5226 32.0204C38.3546 31.9324 37.1846 32.1384 36.1186 32.6204C35.7406 32.7904 35.2946 32.7104 35.0006 32.4164L28.1207 25.5364Z"
                        fill={color}
                    />
                </svg>
            );
        case ResourceType.Standards:
            return (
                <svg
                    width={props.size}
                    height={props.size}
                    x={offsetX}
                    y={offsetY}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M42.028 0C45.262 0.092 47.886 2.744 47.946 5.966C47.95 6.018 47.952 6.072 47.952 6.124C47.952 7.154 47.106 8 46.076 8H38V41C38 44.84 34.84 48 31 48H7C3.16 48 0 44.84 0 41C0 37.16 3.16 34 7 34H10V7C10 3.16 13.16 0 17 0H42C42.008 0 42.018 0 42.028 0ZM26.12 36H7C4.256 36 2 38.258 2 41C2 43.742 4.256 46 7 46H26.12C24.814 44.726 24 42.95 24 41C24 39.05 24.814 37.274 26.12 36ZM12 34H31C31.552 34 32 34.448 32 35C32 35.552 31.552 36 31 36C28.256 36 26 38.258 26 41C26 43.742 28.256 46 31 46C33.742 46 36 43.742 36 41V6C36 4.47 36.586 3.064 37.542 2H17C14.256 2 12 4.258 12 7V34ZM41.976 2C39.792 2.012 38 3.814 38 6H45.946C45.9 3.848 44.16 2.08 42 2H41.976ZM17 18C16.448 18 16 17.552 16 17C16 16.448 16.448 16 17 16H29C29.552 16 30 16.448 30 17C30 17.552 29.552 18 29 18H17ZM17 12C16.448 12 16 11.552 16 11C16 10.448 16.448 10 17 10H29C29.552 10 30 10.448 30 11C30 11.552 29.552 12 29 12H17ZM17 24C16.448 24 16 23.552 16 23C16 22.448 16.448 22 17 22H29C29.552 22 30 22.448 30 23C30 23.552 29.552 24 29 24H17ZM17 30C16.448 30 16 29.552 16 29C16 28.448 16.448 28 17 28H29C29.552 28 30 28.448 30 29C30 29.552 29.552 30 29 30H17Z"
                        fill={color}
                    />
                </svg>
            );
        case ResourceType.Learning_Resource:
            return (
                <svg
                    width={props.size}
                    height={props.size}
                    x={offsetX}
                    y={offsetY}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M17.9969 34.688C17.9969 34.682 17.9969 34.674 17.9969 34.668C17.9969 34.2521 18.2529 33.8882 18.6268 33.7382L31.8885 28.4651C32.5984 28.1832 33.3903 28.1832 34.1021 28.4651L46.1221 33.2463C46.692 33.4742 47.0679 34.0281 47.0679 34.64C47.0679 35.2739 46.666 35.8438 46.0681 36.0538L41.9928 37.4935V43.0866C41.9988 44.1124 41.3729 45.0403 40.423 45.4202C40.415 45.4242 40.407 45.4262 40.397 45.4302C40.397 45.4302 33.9082 47.8258 33.9202 47.8218C33.3303 48.0577 32.6724 48.0597 32.0825 47.8258L25.5936 45.4302C25.5856 45.4282 25.5776 45.4242 25.5696 45.4222C24.6178 45.0423 23.9899 44.1124 23.9959 43.0926V37.4935L19.9966 36.0818V41.9928C19.9966 42.5447 19.5486 42.9926 18.9967 42.9926C18.4448 42.9926 17.9969 42.5447 17.9969 41.9928V34.688ZM39.9931 38.1974L33.9942 40.3151C33.3483 40.545 32.6424 40.545 31.9965 40.3151L25.9955 38.1974V43.0926V43.0986C25.9955 43.3006 26.1175 43.4825 26.3035 43.5605L32.7844 45.9541C32.7944 45.9581 32.8044 45.9601 32.8124 45.9641C32.9303 46.0121 33.0623 46.0121 33.1783 45.9641C33.1883 45.9601 33.1963 45.9581 33.2063 45.9541C33.2063 45.9541 39.6872 43.5605 39.6992 43.5565C39.8771 43.4745 39.9951 43.2946 39.9931 43.0986V43.0926V38.1974ZM44.1444 34.612L33.3643 30.3248C33.1263 30.2308 32.8623 30.2308 32.6264 30.3248L21.8422 34.612L32.6624 38.4314C32.8763 38.5074 33.1123 38.5074 33.3283 38.4314L44.1444 34.612ZM14.9974 0C20.2405 0 24.4958 4.25527 24.4958 9.49837C24.4958 14.7415 20.2405 18.9967 14.9974 18.9967C9.75632 18.9967 5.49905 14.7415 5.49905 9.49837C5.49905 4.25527 9.75632 0 14.9974 0ZM14.9974 1.99966C10.8601 1.99966 7.49871 5.35908 7.49871 9.49837C7.49871 13.6377 10.8601 16.9971 14.9974 16.9971C19.1367 16.9971 22.4961 13.6377 22.4961 9.49837C22.4961 5.35908 19.1367 1.99966 14.9974 1.99966ZM2.03965 33.9942H12.9978C13.5497 33.9942 13.9976 34.4421 13.9976 34.994C13.9976 35.5459 13.5497 35.9938 12.9978 35.9938H0.999828C0.447923 35.9938 0 35.5459 0 34.994C0 26.7674 6.77084 19.9966 14.9974 19.9966C19.4287 19.9966 23.6379 21.9602 26.4854 25.3536C26.8414 25.7756 26.7854 26.4075 26.3635 26.7614C25.9395 27.1153 25.3096 27.0613 24.9537 26.6374C22.4861 23.6979 18.8368 21.9962 14.9974 21.9962C8.20459 21.9962 2.55556 27.3233 2.03965 33.9942Z"
                        fill={color}
                    />
                </svg>
            );
        case ResourceType.LHB_Articles:
        case ResourceType.Articles:
            return (
                <svg
                    width={props.size}
                    height={props.size}
                    x={offsetX}
                    y={offsetY}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 46.996C0 46.4437 0.447715 45.996 1 45.996H36C36.5523 45.996 37 46.4437 37 46.996C37 47.5483 36.5523 47.996 36 47.996H1C0.447715 47.996 0 47.5483 0 46.996Z"
                        fill={color}
                    />
                    <path
                        d="M0 38.996C0 38.4437 0.447715 37.996 1 37.996H47C47.5523 37.996 48 38.4437 48 38.996C48 39.5483 47.5523 39.996 47 39.996H1C0.447715 39.996 0 39.5483 0 38.996Z"
                        fill={color}
                    />
                    <path
                        d="M0 30.996C0 30.4437 0.447715 29.996 1 29.996H47C47.5523 29.996 48 30.4437 48 30.996C48 31.5483 47.5523 31.996 47 31.996H1C0.447715 31.996 0 31.5483 0 30.996Z"
                        fill={color}
                    />
                    <path
                        d="M28 22.996C28 22.4437 28.4477 21.996 29 21.996H47C47.5523 21.996 48 22.4437 48 22.996C48 23.5483 47.5523 23.996 47 23.996H29C28.4477 23.996 28 23.5483 28 22.996Z"
                        fill={color}
                    />
                    <path
                        d="M28 14.996C28 14.4437 28.4477 13.996 29 13.996H47C47.5523 13.996 48 14.4437 48 14.996C48 15.5483 47.5523 15.996 47 15.996H29C28.4477 15.996 28 15.5483 28 14.996Z"
                        fill={color}
                    />
                    <path
                        d="M28 6.99597C28 6.44369 28.4477 5.99597 29 5.99597H47C47.5523 5.99597 48 6.44369 48 6.99597C48 7.54826 47.5523 7.99597 47 7.99597H29C28.4477 7.99597 28 7.54826 28 6.99597Z"
                        fill={color}
                    />
                    <path
                        d="M3 1.99597C2.44772 1.99597 2 2.44369 2 2.99597V20.996C2 21.5483 2.44772 21.996 3 21.996H21C21.5523 21.996 22 21.5483 22 20.996V2.99597C22 2.44369 21.5523 1.99597 21 1.99597H3ZM0 2.99597C0 1.33912 1.34315 -0.00402832 3 -0.00402832H21C22.6569 -0.00402832 24 1.33912 24 2.99597V20.996C24 22.6528 22.6569 23.996 21 23.996H3C1.34315 23.996 0 22.6528 0 20.996V2.99597Z"
                        fill={color}
                    />
                </svg>
            );
        case ResourceType.Organisations:
            return (
                <svg
                    width={props.size}
                    height={props.size}
                    x={offsetX}
                    y={offsetY}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.585786 12.5858C0.960859 12.2107 1.46957 12 2 12H18C18.5304 12 19.0391 12.2107 19.4142 12.5858C19.7893 12.9609 20 13.4696 20 14V47C20 47.5523 19.5523 48 19 48H2C1.46957 48 0.960861 47.7893 0.585786 47.4142C0.210713 47.0391 0 46.5304 0 46V14C0 13.4696 0.210714 12.9609 0.585786 12.5858ZM18 14L2 14V46H18V14Z"
                        fill={color}
                    />
                    <path
                        d="M2.58579 6.58579C2.96086 6.21071 3.46957 6 4 6H16C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13L16 8H4V13C4 13.5523 3.55228 14 3 14C2.44772 14 2 13.5523 2 13V8C2 7.46957 2.21071 6.96086 2.58579 6.58579Z"
                        fill={color}
                    />
                    <path
                        d="M9 0C9.55228 0 10 0.447715 10 1V7C10 7.55228 9.55228 8 9 8C8.44772 8 8 7.55228 8 7V1C8 0.447715 8.44772 0 9 0Z"
                        fill={color}
                    />
                    <path
                        d="M32.5858 18.5858C32.9609 18.2107 33.4696 18 34 18H46C46.5304 18 47.0391 18.2107 47.4142 18.5858C47.7893 18.9609 48 19.4696 48 20V46C48 46.5304 47.7893 47.0391 47.4142 47.4142C47.0391 47.7893 46.5304 48 46 48H33C32.4477 48 32 47.5523 32 47V20C32 19.4696 32.2107 18.9609 32.5858 18.5858ZM46 20H34V46H46V20Z"
                        fill={color}
                    />
                    <path
                        d="M34.5858 14.5858C34.9609 14.2107 35.4696 14 36 14H44C44.5304 14 45.0391 14.2107 45.4142 14.5858C45.7893 14.9609 46 15.4696 46 16V19C46 19.5523 45.5523 20 45 20C44.4477 20 44 19.5523 44 19L44 16H36L36 19C36 19.5523 35.5523 20 35 20C34.4477 20 34 19.5523 34 19V16C34 15.4696 34.2107 14.9609 34.5858 14.5858Z"
                        fill={color}
                    />
                    <path
                        d="M18 25C18 24.4477 18.4477 24 19 24H33C33.5523 24 34 24.4477 34 25C34 25.5523 33.5523 26 33 26H19C18.4477 26 18 25.5523 18 25Z"
                        fill={color}
                    />
                    <path
                        d="M18 47C18 46.4477 18.4477 46 19 46H33C33.5523 46 34 46.4477 34 47C34 47.5523 33.5523 48 33 48H19C18.4477 48 18 47.5523 18 47Z"
                        fill={color}
                    />
                    <path
                        d="M4 19C4 18.4477 4.44772 18 5 18H15C15.5523 18 16 18.4477 16 19C16 19.5523 15.5523 20 15 20H5C4.44772 20 4 19.5523 4 19Z"
                        fill={color}
                    />
                    <path
                        d="M4 25C4 24.4477 4.44772 24 5 24H15C15.5523 24 16 24.4477 16 25C16 25.5523 15.5523 26 15 26H5C4.44772 26 4 25.5523 4 25Z"
                        fill={color}
                    />
                    <path
                        d="M4 31C4 30.4477 4.44772 30 5 30H15C15.5523 30 16 30.4477 16 31C16 31.5523 15.5523 32 15 32H5C4.44772 32 4 31.5523 4 31Z"
                        fill={color}
                    />
                    <path
                        d="M36 25C36 24.4477 36.4477 24 37 24H43C43.5523 24 44 24.4477 44 25C44 25.5523 43.5523 26 43 26H37C36.4477 26 36 25.5523 36 25Z"
                        fill={color}
                    />
                    <path
                        d="M36 31C36 30.4477 36.4477 30 37 30H43C43.5523 30 44 30.4477 44 31C44 31.5523 43.5523 32 43 32H37C36.4477 32 36 31.5523 36 31Z"
                        fill={color}
                    />
                    <path
                        d="M4 37C4 36.4477 4.44772 36 5 36H15C15.5523 36 16 36.4477 16 37C16 37.5523 15.5523 38 15 38H5C4.44772 38 4 37.5523 4 37Z"
                        fill={color}
                    />
                    <path
                        d="M36 37C36 36.4477 36.4477 36 37 36H43C43.5523 36 44 36.4477 44 37C44 37.5523 43.5523 38 43 38H37C36.4477 38 36 37.5523 36 37Z"
                        fill={color}
                    />
                    <path
                        d="M22 31C22 30.4477 22.4477 30 23 30H29C29.5523 30 30 30.4477 30 31C30 31.5523 29.5523 32 29 32H23C22.4477 32 22 31.5523 22 31Z"
                        fill={color}
                    />
                    <path
                        d="M22 37C22 36.4477 22.4477 36 23 36H29C29.5523 36 30 36.4477 30 37C30 37.5523 29.5523 38 29 38H23C22.4477 38 22 37.5523 22 37Z"
                        fill={color}
                    />
                    <path
                        d="M6.58579 40.5858C6.96086 40.2107 7.46957 40 8 40H10C10.5304 40 11.0391 40.2107 11.4142 40.5858C11.7893 40.9609 12 41.4696 12 42V47C12 47.5523 11.5523 48 11 48C10.4477 48 10 47.5523 10 47V42L8 42L8 47C8 47.5523 7.55228 48 7 48C6.44772 48 6 47.5523 6 47V42C6 41.4696 6.21071 40.9609 6.58579 40.5858Z"
                        fill={color}
                    />
                    <path
                        d="M38.5858 40.5858C38.9609 40.2107 39.4696 40 40 40H42C42.5304 40 43.0391 40.2107 43.4142 40.5858C43.7893 40.9609 44 41.4696 44 42V47C44 47.5523 43.5523 48 43 48C42.4477 48 42 47.5523 42 47V42H40V47C40 47.5523 39.5523 48 39 48C38.4477 48 38 47.5523 38 47V42C38 41.4696 38.2107 40.9609 38.5858 40.5858Z"
                        fill={color}
                    />
                </svg>
            );
        case ResourceType.Dataset:
            return (
                <svg
                    width={props.size}
                    height={props.size}
                    x={offsetX}
                    y={offsetY}
                    viewBox="0 0 15 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="0.5" y="17.5" width="14" height="1" fill={color} />
                    <path
                        d="M7.5 0C3.35625 0 0 1.79 0 4V14C0 16.21 3.36563 18 7.5 18C11.6344 18 15 16.21 15 14V4C15 1.79 11.6438 0 7.5 0ZM13.125 14C13.125 14.5 11.1281 16 7.5 16C3.87188 16 1.875 14.5 1.875 14V11.77C3.38438 12.55 5.3625 13 7.5 13C9.6375 13 11.6156 12.55 13.125 11.77V14ZM13.125 9.45C11.9062 10.4 9.76875 11 7.5 11C5.23125 11 3.09375 10.4 1.875 9.45V6.64C3.25312 7.47 5.25938 8 7.5 8C9.74063 8 11.7469 7.47 13.125 6.64V9.45ZM7.5 6C3.87188 6 1.875 4.5 1.875 4C1.875 3.5 3.87188 2 7.5 2C11.1281 2 13.125 3.5 13.125 4C13.125 4.5 11.1281 6 7.5 6Z"
                        fill={color}
                    />
                </svg>
            );
        case ResourceType.Series:
            return (
                <svg
                    width={props.size}
                    height={props.size}
                    x={offsetX}
                    y={offsetY}
                    viewBox="0 0 15 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="0.5" y="17.5" width="14" height="1" fill={color} />
                    <path
                        d="M1 13H5L7.5 4L12.5 20.5L17 9L19 13H23"
                        stroke={color}
                        strokeWidth="2"
                    />
                </svg>
            );
        default:
            return <></>;
    }
};
