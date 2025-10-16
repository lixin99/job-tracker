const fetch = require('node-fetch');
const cheerio = require('cheerio');

// 目标网站列表
const TARGET_SITES = [
  {
    name: '深圳湾实验室',
    url: 'https://www.szbl.ac.cn/careers/',
    type: 'research'
  },
  {
    name: '科学网招聘',
    url: 'http://talent.sciencenet.cn/index.php?channel=wuli',
    type: 'academic'
  }
];

async function crawlSite(site) {
  try {
    const response = await fetch(site.url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const jobs = [];
    
    // 根据网站结构解析招聘信息
    // 这里需要根据实际网站结构调整选择器
    $('.job-item, .recruit-list').each((index, element) => {
      const title = $(element).find('h3 a').text().trim();
      const url = $(element).find('h3 a').attr('href');
      
      if (title && (title.includes('神经') || title.includes('脑') || title.includes('超声'))) {
        jobs.push({
          title,
          url: url.startsWith('http') ? url : new URL(url, site.url).href,
          source: site.name,
          date: new Date().toISOString().split('T')[0]
        });
      }
    });
    
    return jobs;
  } catch (error) {
    console.error(`抓取 ${site.name} 失败:`, error);
    return [];
  }
}

async function crawlAllSites() {
  const allJobs = [];
  
  for (const site of TARGET_SITES) {
    console.log(`正在抓取 ${site.name}...`);
    const jobs = await crawlSite(site);
    allJobs.push(...jobs);
    
    // 避免请求过于频繁
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return allJobs;
}

module.exports = { crawlAllSites };