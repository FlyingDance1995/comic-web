export const mappingStoryStatus  = (value) => {
    switch (value) {
        case 'processing':
            return {
                title: 'Đang phát hành',
                color: '#2D2FFD'
            };

        case 'draft':
            return {
                title: 'Nháp',
                color: '#FE3821'
            };

        case 'awaiting':
            return {
                title: 'Chờ phê duyệt',
                color: '#FCBD01'
            };

        case 'finish':
            return {
                title: 'Hoàn thành',
                color: 'green'
            };

        default:
            return {
                title: '-',
                color: '#000000'
            };
    }
};

export const mappingStoryType  = (value) => {
    switch (value) {
        case 'translated':
            return 'Truyện dịch';

        case 'composed':
            return 'Truyện sáng tác';

        default:
            return '-';
    }
};

export const mappingTeamStatus  = (value) => {
    switch (value) {
        case 'release':
            return {
                title: 'Đang phát hành',
                color: '#2D2FFD'
            };

        case 'awaiting':
            return {
                title: 'Chờ phê duyệt',
                color: '#FCBD01'
            };

        default:
            return {
                title: '-',
                color: '#000000'
            };
    }
};

export const mappingUserStatus  = (value) => {
    switch (value) {
        case true:
            return {
                title: 'Đã kích hoạt',
                color: '#2D2FFD'
            };

        case false:
            return {
                title: 'Không kích hoạt',
                color: '#FE3821'
            };

        default:
            return {
                title: '-',
                color: '#000000'
            };
    }
};


export const mappingReportStatus  = (value) => {
    switch (value) {
        case 'init':
            return {
                title: 'Khởi tạo',
                color: '#2D2FFD'
            };

        case 'error':
            return {
                title: 'False Positive',
                color: '#000000'
            };

        case 'finish':
            return {
                title: 'Đã xử lý',
                color: '#000000'
            };

        default:
            return {
                title: '-',
                color: '#000000'
            };
    }
};
