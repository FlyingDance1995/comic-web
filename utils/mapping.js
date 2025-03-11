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

export const mappingStoryStatusTable  = [
    {
        label: 'Nháp',
        value: 'draft'
    },
    {
        label: 'Chờ phê duyệt',
        value: 'awaiting'
    },
    {
        label: 'Đang phát hành',
        value: 'processing'
    },
    {
        label: 'Hoàn thành',
        value: 'finish'
    },
];

export const mappingTransactionStatusTable  = [
    {
        label: 'Thành công',
        value: 'success'
    },
    {
        label: 'Thất bại',
        value: 'failed'
    },
    {
        label: 'Đang chờ',
        value: 'pending'
    },
    {
        label: 'Khởi tạo',
        value: 'init'
    }
];

export const filterStoryStatus  = (value, row) => {
    switch (value) {
        case 'processing':
            return row.status === "processing";

        case 'draft':
            return row.status === "draft";

        case 'awaiting':
            return row.status === "awaiting";

        case 'finish':
            return row.status === "finish"

        default:
            return row.status === null
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

export const mappingStoryTypeTable  = [
    {
        label: 'Truyện dịch',
        value: 'translated'
    },
    {
        label: 'Truyện sáng tác',
        value: 'composed'
    }
];

export const filterStoryType  = (value, row) => {
    switch (value) {
        case 'translated':
            return row.type === "translated";

        case 'composed':
            return row.type === "composed";

        default:
            return row.type === null
    }
};

export const mappingStoryRecommendedTable  = [
    {
        label: 'Có',
        value: true
    },
    {
        label: 'Không',
        value: false
    }
];

export const filterStoryRecommended  = (value, row) => {
    if(value) {
        return row.recommended === true;
    } else {
        return row.recommended === false;
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

        case 'init':
            return {
                title: 'Khởi tạo',
                color: '#000000'
            };

        default:
            return {
                title: '-',
                color: '#000000'
            };
    }
};

export const mappingTransactionStatus  = (value) => {
    switch (value) {
        case 'success':
            return {
                title: 'Thành công',
                color: 'green'
            };

        case 'pending':
            return {
                title: 'Đang chờ',
                color: '#2D2FFD'
            };

        case 'failed':
            return {
                title: 'Thất bại',
                color: '#FCBD01'
            };

        case 'init':
            return {
                title: 'Khởi tạo',
                color: '#000000'
            };

        default:
            return {
                title: '-',
                color: '#000000'
            };
    }
};

export const mappingTeamStatusTable  = [
    {
        label: 'Đang phát hành',
        value: 'release'
    },
    {
        label: 'Chờ phê duyệt',
        value: 'awaiting'
    }
];

export const filterTeamStatus  = (value, row) => {
    switch (value) {
        case 'release':
            return row.status === 'release';

        case 'awaiting':
            return row.status === 'awaiting';

        default:
            return row.status === null
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

export const mappingManageUserTable  = [
    {
        label: 'Đã kích hoạt',
        value: true
    },
    {
        label: 'Không kích hoạt',
        value: false
    }
];

export const filterManageUserStatus  = (value, row) => {
    switch (value) {
        case true:
            return row.is_active === true;

        case false:
            return row.is_active === false;

        default:
            return row.is_active === null
    }
};

export const mappingAffiliateTable  = [
    {
        label: 'Đã kích hoạt',
        value: true
    },
    {
        label: 'Không kích hoạt',
        value: false
    }
];

export const filterAffiliateStatus  = (value, row) => {
    switch (value) {
        case true:
            return row.enable === true;

        case false:
            return row.enable === false;

        default:
            return row.enable === null
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


export const mappingReportErrTable  = [
    {
        label: 'Khởi tạo',
        value: 'init'
    },
    {
        label: 'False Positive',
        value: 'error'
    },
    {
        label: 'Đã xử lý',
        value: 'finish'
    }
];

export const filterReportErrStatus  = (value, row) => {
    switch (value) {
        case 'init':
            return row.status === 'init';

        case 'error':
            return row.status === 'error';

        case 'finish':
            return row.status === 'finish';

        default:
            return row.status === null
    }
};

export const mappingReportLicenseTable  = [
    {
        label: 'Khởi tạo',
        value: 'init'
    },
    {
        label: 'False Positive',
        value: 'error'
    },
    {
        label: 'Đã xử lý',
        value: 'finish'
    }
];

export const filterReportLicense  = (value, row) => {
    switch (value) {
        case 'init':
            return row.status === 'init';

        case 'error':
            return row.status === 'error';

        case 'finish':
            return row.status === 'finish';

        default:
            return row.status === null
    }
};

export const mappingRequestAuthorTable  = [
    {
        label: 'Khởi tạo',
        value: 'init'
    },
    {
        label: 'False Positive',
        value: 'error'
    },
    {
        label: 'Đã xử lý',
        value: 'finish'
    }
];

export const filterRequestAuthor  = (value, row) => {
    switch (value) {
        case 'init':
            return row.status === 'init';

        case 'error':
            return row.status === 'error';

        case 'finish':
            return row.status === 'finish';

        default:
            return row.status === null
    }
};

export const mappingChapterStatus  = (value) => {
    switch (value) {
        case true:
            return {
                title: 'Nháp',
                color: '#FE3821'
            };

        case false:
            return {
                title: 'Đã đăng',
                color: '#2D2FFD'
            };

        default:
            return {
                title: '-',
                color: '#000000'
            };
    }
};
