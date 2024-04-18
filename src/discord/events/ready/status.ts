import { Event } from "#base";
import { join } from "path";
import { QuickDB } from "quick.db";

const rootdir = process.cwd()

const db = {
    stats: new QuickDB({table: 'name', filePath: join(rootdir, "database/status.sqlite")})
}

new Event({
    name: "event: status",
    event: "ready",
    async run(interaction) {
            const name: string = await db.stats.get('name.name') ?? ''
            const type: any = await db.stats.get('name.activide')
            const url: any = await db.stats.get('name.url')
    
            const active = await db.stats.all()
            console.log(name)
            console.log(type)
            console.log(url)
            
            interaction.user.setPresence({
                activities: [
                    {
                        name,
                        type,
                        url
                    }
                ]
            });
            console.log(active);
    }
});