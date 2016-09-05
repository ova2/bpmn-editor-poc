    export class UId
    {

        // Generate a new UID
        public static createUID(): string
        {
            let date = new Date().getTime();
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>
            {
                let r = (date + Math.random() * 16) % 16 | 0;
                date = Math.floor(date / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }

    }
