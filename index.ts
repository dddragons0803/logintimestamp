type User = {
    userId: string;
    deviceDetails: {
        logged_in: string;
        logged_out: string;
        lastSeenAt: string;
    }[];
};

type MonthlyStats = {
    month: string;
    loggedInUsers: Set<string>;
    activeUsers: Set<string>;
};

function getMonthlyStats(users: User[]): MonthlyStats[] {
    const monthlyStatsMap: { [month: string]: MonthlyStats } = {};

    users.forEach(user => {
        user.deviceDetails.forEach(device => {
            const loginDate = new Date(device.logged_in);
            const logoutDate = new Date(device.logged_out);
            const lastSeenDate = new Date(device.lastSeenAt);

            const monthKey = ${loginDate.getFullYear()}-${String(loginDate.getMonth() + 1).padStart(2, '0')};

            if (!monthlyStatsMap[monthKey]) {
                monthlyStatsMap[monthKey] = {
                    month: monthKey,
                    loggedInUsers: new Set(),
                    activeUsers: new Set(),
                };
            }

            monthlyStatsMap[monthKey].loggedInUsers.add(user.userId);

            if (logoutDate.getMonth() === loginDate.getMonth() && logoutDate.getFullYear() === loginDate.getFullYear()) {
                monthlyStatsMap[monthKey].activeUsers.add(user.userId);
            } else if (lastSeenDate.getMonth() === loginDate.getMonth() && lastSeenDate.getFullYear() === loginDate.getFullYear()) {
                monthlyStatsMap[monthKey].activeUsers.add(user.userId);
            }
        });
    });

    return Object.values(monthlyStatsMap);
}

// Example
const users: User[] = [
    {
        userId: 'user1',
        deviceDetails: [
            { logged_in: '2024-01-01', logged_out: '2024-01-15', lastSeenAt: '2024-01-14' },
            { logged_in: '2024-01-20', logged_out: '2024-01-25', lastSeenAt: '2024-01-24' },
        ],
    },
    {
        userId: 'user2',
        deviceDetails: [
            { logged_in: '2024-01-05', logged_out: '2024-01-10', lastSeenAt: '2024-01-09' },
            { logged_in: '2024-02-01', logged_out: '2024-02-15', lastSeenAt: '2024-02-14' },
        ],
    },
];

console.log(getMonthlyStats(users));