import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Sparkles,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    setMessages([
      {
        role: 'assistant',
        content: `Hello ${profile?.full_name}! I'm your NIAT Assistant, here to help you navigate the University Management System. 

${profile?.role === 'student' 
  ? 'I can help you with:\n• Raising tickets for various issues\n• Requesting permissions\n• Understanding announcements\n• Navigating the system' 
  : 'I can help you with:\n• Managing student tickets\n• Reviewing permission requests\n• Creating announcements\n• Understanding system analytics'
}

How can I assist you today?`,
        timestamp: new Date()
      }
    ]);
  }, [profile]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          message: userMessage.content,
          userRole: profile?.role,
          conversationHistory
        }
      });

      if (error) {
        throw error;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get response from AI assistant. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = profile?.role === 'student' 
    ? [
        "How do I raise a ticket for water supply issues?",
        "How can I request permission for an outing?",
        "Where can I see the latest announcements?",
        "How do I check my ticket status?"
      ]
    : [
        "How do I resolve student tickets?",
        "How can I create a new announcement?",
        "How do I approve permission requests?",
        "Where can I see system analytics?"
      ];

  const handleQuickAction = (action: string) => {
    setInput(action);
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">NIAT AI Assistant</h1>
        <p className="text-muted-foreground mt-2">
          Your intelligent companion for the University Management System
        </p>
        <Badge variant="outline" className="mt-2">
          <Bot className="h-3 w-3 mr-1" />
          Powered by AI
        </Badge>
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
              Quick Actions
            </CardTitle>
            <CardDescription>Try asking me about these common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start h-auto p-3 whitespace-normal"
                  onClick={() => handleQuickAction(action)}
                >
                  <HelpCircle className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
                  {action}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Container */}
      <Card className="h-[500px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat with AI Assistant
          </CardTitle>
        </CardHeader>
        
        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-0">
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {message.role === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`flex-1 space-y-1 ${
                  message.role === 'user' ? 'text-right' : ''
                }`}>
                  <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white ml-auto'
                      : 'bg-muted'
                  }`}>
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="inline-block p-3 rounded-lg bg-muted">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about the University Management System..."
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!input.trim() || loading}
              className="px-6"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900">Instant Help</h3>
            <p className="text-sm text-blue-700">Get immediate assistance 24/7</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <Lightbulb className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-900">Smart Guidance</h3>
            <p className="text-sm text-green-700">Step-by-step instructions</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-900">AI-Powered</h3>
            <p className="text-sm text-purple-700">Advanced AI understanding</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}