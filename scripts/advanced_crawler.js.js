// 扩展关键词列表
const KEYWORDS = [
    // 核心研究方向
    '超声神经调控', '神经电生理', '神经调控', '脑机接口', '神经界面',
    
    // 相关技术
    '电生理', '脑电图', '肌电图', '经颅磁刺激', '经颅超声',
    '深部脑刺激', '神经信号', '神经记录', '神经刺激',
    
    // 应用领域
    '神经科学', '脑科学', '神经工程', '神经技术',
    '神经假体', '神经康复', '神经疾病',
    
    // 相关学科
    '生物医学工程', '神经生物学', '认知科学', '计算神经科学'
];

// 增强关键词匹配逻辑
function isRelevantJob(title, description) {
    const text = (title + ' ' + description).toLowerCase();
    return KEYWORDS.some(keyword => 
        text.includes(keyword.toLowerCase())
    );
}