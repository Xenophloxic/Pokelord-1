import discord
from discord.ext import commands
from discord import Member, channel, message
from discord.ext.commands import has_permissions, MissingPermissions, Bot, has_guild_permissions
import random
import json
import time
import math

TOKEN = 'NzI5Mzk1NjE0MDkzMjc5MjMy.XwIUmQ.podkt-NR-ngLPnXlF53oTXrTyhQ'

def get_prefix(client, message):
    with open('prefixes.json', 'r') as f:
        prefixes = json.load(f)

    return prefixes[str(message.guild.id)]

client: Bot = commands.Bot(command_prefix= get_prefix)


client.remove_command('help')

@client.event
async def on_guild_join(guild):
    with open('prefixes.json', 'r') as f:
        prefixes = json.load(f)

    prefixes[str(guild.id)] = 'p!'

    with open('prefixes.json', 'w') as f:
        json.dump(prefixes, f, indent=4)

@client.event
async def on_guild_remove(guild):
    with open('prefixes.json', 'r') as f:
        prefixes = json.load(f)
    
    prefixes.pop(str(guild.id))

    with open('prefixes.json', 'w') as f:
        json.dump(prefixes, f, indent=4)

@client.command()
@commands.guild_only()
async def prefix(ctx, pre):
    if ctx.message.author.guild_permissions.administrator:
        with open('prefixes.json', 'r') as f:
            prefixes = json.load(f)

        prefixes[str(ctx.guild.id)] = pre
        client.pre = pre

        with open('prefixes.json', 'w') as f:
            json.dump(prefixes, f, indent=4)
    else:
        permission_error = str('Sorry you do not have permissions to do that!')
        await ctx.send(permission_error)

@client.event
async def on_ready():
    await client.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name=f'PokéLord | p!help'))
    print('I am ready to go')

@client.command()
async def lol(ctx):
    await ctx.send('lol')

@client.command(pass_context=True)
async def spawn(ctx):

    channel = ctx.message.channel
    author = ctx.message.author

    embedsp = discord.Embed()
    embedsp.set_author(name='A wild pokemon has appeared!')
    embedsp.add_field(name='឵឵ ', value=f'Guess the pokemon and type `p!catch <pokemon>` to guess it!')
    embedsp.set_image(url='https://images-ext-2.discordapp.net/external/FITLnpWWC78HNrRnjd9gcryVVdmKVrbhhVjgvTpbzro/https/cdn.bulbagarden.net/upload/7/76/HOME890E.png')
    await ctx.send(embed=embedsp)
    await author.send('Did you really think that would work? : P')

@client.command()
@commands.guild_only()
async def website(ctx):
    await ctx.send('Website is in progress!')

@client.command()
@commands.guild_only()
async def server(ctx):

    embeds = discord.Embed(
        color= discord.Colour.green()
    )
    embeds.set_author(name='Here is our Official Server!')
    embeds.add_field(name='Server:', value='[Join here](https://discord.gg/2ktKd9b)')
    await ctx.send(embed=embeds)

@client.command()
@commands.guild_only()
async def servers(ctx):
    await ctx.send(f'Pokelord is in {len(client.guilds)} servers!')
@client.command()
@commands.guild_only()
async def invite(ctx):

    embedi = discord.Embed(
        color= discord.Colour.green()
    )
    embedi.set_author(name='Invite the bot here!')
    embedi.add_field(name='Link:', value='[Here!](https://discord.com/api/oauth2/authorize?client_id=729395614093279232&permissions=359488&scope=bot)')
    await ctx.send(embed=embedi)

@client.command()
@commands.guild_only()
async def goal(ctx):
    await ctx.send(f'{100 - len(client.guilds)} more servers until we reach our goal!')

@client.command()
@commands.guild_only()
async def users(ctx):
    await ctx.send(f'Pokelord has {len(client.users)} users!')

@client.command()
@commands.guild_only()
async def donate(ctx):
    author = ctx.message.author

    embedd = discord.Embed(
        color = discord.Colour.purple()
    )
    embedd.set_author(name='Donating! Once you click on the Patreon link and donate, ping the devs in #claim-redeem and #claim-role')
    embedd.add_field(name='Link:', value='Donating is down for now')
    await author.send(embed=embedd)
    await ctx.send('Sent you a DM with instructions on Donating!')

@client.command(pass_context=True)
@commands.guild_only()
async def redeems(ctx):
    await ctx.send(f'It is redeem')

@client.command(pass_context=True)
@commands.guild_only()
async def help(ctx):
    author = ctx.message.author

    embed = discord.Embed(
        color = discord.Colour.orange()
    )

    embed.set_author(name='Help\n These are the help commands:')
    embed.add_field(name=f'`p!helpstart`', value='Helps with starting your adventure', inline=False)
    embed.add_field(name=f'`p!helpcatch`', value='Helps with catching', inline=False)
    embed.add_field(name=f'`p!helpinfo`', value='Helps with infoing and selecting', inline=False)
    embed.add_field(name=f'`p!helppoke`', value='Helps with pokemon', inline=False)
    embed.add_field(name=f'`p!helptrade`', value='Helps with trade', inline=False)
    embed.add_field(name=f'`p!helpmarket`', value='Helps with market', inline=False)
    embed.add_field(name=f'`p!helpdonate`', value='Helps with donating', inline=False)
    embed.add_field(name=f'`p!helpredeem`', value='Helps with redeems', inline=False)
    embed.add_field(name=f'`p!helptutorial`', value='Helps with tutorials', inline=False)
    embed.add_field(name=f'`p!helpshop`', value='Helps with the shop', inline=False)
    embed.add_field(name=f'`p!helpdaily`', value='Helps with daily', inline=False)
    embed.add_field(name=f'`p!helpextras`', value='Helps with extra commands', inline=False)
    embed.add_field(name=f'`p!helphelp`', value='Do this command only if there is something wrong with the bot', inline=False)
    await author.send(embed=embed)
    await ctx.send('I sent you a DM with the help message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helpstart(ctx):
    author = ctx.message.author

    embed1 = discord.Embed(
        color=discord.Colour.orange()
    )

    embed1.set_author(name=f'Use p!start to start!')
    embed1.add_field(name='Then use:', value=f'p!pick <starter>', inline=False)
    await author.send(embed=embed1)
    await ctx.send('I sent you a DM with the help start message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helpcatch(ctx):
    author = ctx.message.author

    embed2 = discord.Embed(
        color=discord.Colour.orange()
    )

    embed2.set_author(name=f'Use p!catch <pokemon> to catch a wild pokemon!')
    embed2.add_field(name='Want a hint?', value=f'use p!hint', inline=False)
    await author.send(embed=embed2)
    await ctx.send('I sent you a DM with the help catch message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helpinfo(ctx):
    author = ctx.message.author

    embed3 = discord.Embed(
        color=discord.Colour.orange()
    )

    embed3.set_author(name=f'Use p!info to see your selected pokemon!')
    embed3.add_field(name='Use:', value=f'p!info <number> to see a specific pokemon', inline=False)
    embed3.add_field(name='Use:', value=f'p!select <number> to select a pokemon!', inline=False)
    await author.send(embed=embed3)
    await ctx.send('I sent you a DM with the help infoing message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helppoke(ctx):
    author = ctx.message.author

    embed4 = discord.Embed(
        color=discord.Colour.orange()
    )

    embed4.set_author(name=f'Use p!pokemon to see your pokemon!')
    embed4.add_field(name='Use:', value=f'p!pokemon <filters> to filter your pokemon!', inline=False)
    embed4.add_field(name='Filters:', value='--iv >/< <number>\n --name <name>\n **Mobile Friendly!**', inline=False)
    await author.send(embed=embed4)
    await ctx.send('I sent you a DM with the help pokemon message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helptrade(ctx):
    author = ctx.message.author

    embed5 = discord.Embed(
        color = discord.Colour.orange()
    )

    embed5.set_author(name=f'Use p!trade <mention user> to trade!')
    embed5.add_field(name=f'p!p add <number>', value='To add pokemon', inline=False)
    embed5.add_field(name=f'p!c add <number>', value='To add credits', inline=False)
    embed5.add_field(name=f'p!r add <number>', value='To add redeems', inline=False)
    embed5.add_field(name=f'p!confirm', value='To confirm trade', inline=False)
    await author.send(embed=embed5)
    await ctx.send('I sent you a DM with the help trade message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helpmarket(ctx):
    author = ctx.message.author

    embed6 = discord.Embed(
        color = discord.Colour.orange()
    )

    embed6.set_author(name=f'Use p!market search <filter> to search! p!market list <number> <price> to list!')
    embed6.add_field(name='Filters:', value='--iv >/< <number>\n --name <name>\n **Mobile Friendly!**', inline=False)
    await author.send(embed=embed6)
    await ctx.send('I sent you a DM with the help market message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helpdonate(ctx):
    author = ctx.message.author

    embed7 = discord.Embed(
        color= discord.Colour.orange()
    )
    embed7.set_author(name=f'Use p!donate and follow the instructions to donate and get redeems!')
    embed7.add_field(name='឵឵឵឵', value='You get redeems from donating!', inline=False)
    await author.send(embed=embed7)
    await ctx.send('I sent you a DM with the help donate message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helpredeem(ctx):
    author = ctx.message.author

    embed8 = discord.Embed(
        color= discord.Colour.orange()
    )
    embed8.set_author(name='Redeems!')
    embed8.add_field(name=f'p!redeem <pokemon>', value='Gives you a level 1 pokemon of your choice!', inline=False)
    embed8.add_field(name=f'p!redeem credits', value='Gives you 15,000 credits!', inline=False)
    embed8.add_field(name=f'p!redeem spawn <pokemon>', value='Spawns a pokemon of your choice! Others can catch it too!', inline=False)
    await author.send(embed=embed8)
    await ctx.send('I sent you a DM with the help redeem message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helptutorial(ctx):
    author = ctx.message.author

    embed9 = discord.Embed(
        color= discord.Colour.orange()
    )
    embed9.set_author(name=f'Use p!tutorial for tutorials!')
    embed9.add_field(name='Turoials', value='Tutorials are on YT, if you cannot get YT in your country, sorry! (we might add other options later)', inline=False)
    await author.send(embed=embed9)
    await ctx.send('I sent you a DM with the help tutorial message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helpshop(ctx):
    author = ctx.message.author

    embed10 = discord.Embed(
        color= discord.Colour.orange()
    )
    embed10.set_author(name=f'Use p!shop for shop!')
    embed10.add_field(name='឵឵឵឵', value='Shop', inline=False)
    await author.send(embed=embed10)
    await ctx.send('I sent you a DM with the help shop message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helpdaily(ctx):
    author = ctx.message.author

    embed11 = discord.Embed(
        color= discord.Colour.orange()
    )
    embed11.set_author(name=f'Use p!daily and follow the instructions to vote and get credits(maybe even redeems)!')
    embed11.add_field(name='឵឵឵឵', value='You get rewards from voting!', inline=False)
    await author.send(embed=embed11)
    await ctx.send('I sent you a DM with the help daily message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helpextras(ctx):
    author = ctx.message.author

    embed12 = discord.Embed(
        color= discord.Colour.orange()
    )
    embed12.set_author(name=f'Here are our extra commands:')
    embed12.add_field(name=f'p!vote', value='Vote for rewards', inline=False)
    embed12.add_field(name=f'p!vote', value='Vote for rewards', inline=False)
    embed12.add_field(name=f'p!vote', value='Vote for rewards', inline=False)
    embed12.add_field(name=f'p!vote', value='Vote for rewards', inline=False)
    embed12.add_field(name=f'p!vote', value='Vote for rewards', inline=False)
    embed12.add_field(name=f'p!vote', value='Vote for rewards', inline=False)
    await author.send(embed=embed12)
    await ctx.send('I sent you a DM with the help daily message!')

@client.command(pass_context=True)
@commands.guild_only()
async def helphelp(ctx):
    author = ctx.message.author

    embed13 = discord.Embed(
        color= discord.Colour.orange()
    )
    embed13.set_author(name=f'Is the bot down? Not working? use p!server and see if there is an outage')
    embed13.add_field(name='Works for others?', value='DM a Developer and tell them your problem', inline=False)
    embed13.add_field(name='Developers:', value='<@393480172638044160>\n <@731930953446064230>\n <@688863688064893015>')
    await author.send(embed=embed13)
    await ctx.send('I sent you a DM with the help-help message!')

@client.group(name='shop', invoke_without_command=True)
async def shop(ctx):
    embed14 = discord.Embed(
        title='Welcome to the shop!',
        description='You can buy items, natures, IV, forms, and more! \n Use `shop <page number>` to turn the page!'
    )

    embed14.set_author(name="Pokelord's Shop!")
    embed14.set_thumbnail(url=ctx.message.author.avatar_url)
    embed14.add_field(name='Page 1 |', value='Items!', inline=False)
    embed14.add_field(name='Page 2 |', value='Natures!', inline=False)
    embed14.add_field(name='Page 3 |', value='IV!', inline=False)
    embed14.add_field(name='Page 4 |', value='Forms!', inline=False)
    embed14.add_field(name='Page 5 |', value='Others!', inline=False)
    embed14.set_footer(text='Need more credits? Vote for credits daily!')
    await ctx.send(embed=embed14)


@shop.command(name='1')
async def _1_subcommand(ctx):
    embed16 = discord.Embed(
        title='Welcome to the items shop!',
        description='You can buy items and more!'
    )

    embed16.set_author(name='Use p!buy <item> to buy!')
    embed16.set_thumbnail(url=ctx.message.author.avatar_url)
    embed16.add_field(name='Rare candies', value='50 credits per', inline=False)
    embed16.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed16.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed16.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed16.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed16.set_footer(text='Need more credits? Vote for credits daily!')
    await ctx.send(embed=embed16)

@shop.command(name='2')
async def _2_subcommand(ctx):
    embed17 = discord.Embed(
        title='Welcome to the shop!',
        description='You can buy Natures here!'
    )

    embed17.set_author(name='Use p!buy <nature> to buy!')
    embed17.set_thumbnail(url=ctx.message.author.avatar_url)
    embed17.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed17.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed17.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed17.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed17.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed17.set_footer(text='Need more credits? Vote for credits daily!')
    await ctx.send(embed=embed17)

@shop.command(name='3')
async def _3_subcommand(ctx):
    embed18 = discord.Embed(
        title='Welcome to the forms shop!',
        description='You can buy forms here!'
    )

    embed18.set_author(name='Use p!buy <item> to buy!')
    embed18.set_thumbnail(url=ctx.message.author.avatar_url)
    embed18.add_field(name='Page 1 |', value='Items!', inline=False)
    embed18.add_field(name='Page 2 |', value='Natures!', inline=False)
    embed18.add_field(name='Page 3 |', value='IV!', inline=False)
    embed18.add_field(name='Page 4 |', value='Forms!', inline=False)
    embed18.add_field(name='Page 5 |', value='Others!', inline=False)
    embed18.set_footer(text='Need more credits? Vote for credits daily!')
    await ctx.send(embed=embed18)

@shop.command(name='4')
async def _4_subcommand(ctx):
    embed20 = discord.Embed(
        title='Welcome to the forms shop!',
        description='You can buy forms and more!'
    )

    embed20.set_author(name='Use p!buy <item> to buy!')
    embed20.set_thumbnail(url=ctx.message.author.avatar_url)
    embed20.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed20.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed20.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed20.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed20.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed20.set_footer(text='Need more credits? Vote for credits daily!')
    await ctx.send(embed=embed20)


@shop.command(name='5')
async def _5_subcommand(ctx):
    embed19 = discord.Embed(
        title='Welcome to the Other shop!',
        description='You can buy many things here!'
    )

    embed19.set_author(name='Use p!buy <item> to buy!')
    embed19.set_thumbnail(url=ctx.message.author.avatar_url)
    embed19.add_field(name='Redeem', value='15,000 credits for a redeem', inline=False)
    embed19.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed19.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed19.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed19.add_field(name='Not added yet', value='Not added yet', inline=False)
    embed19.set_footer(text='Need more credits? Vote for credits daily!')
    await ctx.send(embed=embed19)


client.run(TOKEN)